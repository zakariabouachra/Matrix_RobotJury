from flask import Blueprint, request, jsonify, json
from app.services import db_service, tn_service, pd_service, at_service, el_service, ur_service
import os
import tempfile
from RobotJury.prediction import Prediction
articles_routes = Blueprint('articles_routes', __name__)

@articles_routes.route('/article_information', methods=['POST'])
def receive_data():
    try:
        token = request.headers.get('Authorization')
        if token:
            token = token.split(" ")[1]
            decoded_token = tn_service.verify_token(token)
            if decoded_token:
                user_id = decoded_token.get('user_id')
                if user_id:
                    file = request.files['file']
                    other_data = request.form.get('otherData')

                    other_data_dict = json.loads(other_data)

                    authors_data = other_data_dict.get('authors', [])
                    author_ids = []
                    for author in authors_data:
                        author_data = {
                            'NOM': author.get('lastName', ''),
                            'PRENOM': author.get('firstName', ''),
                            'INSTITUTION': author.get('institution', ''),
                            'COUNTRY': author.get('country', '')
                        }
                        try:
                            db_service.execute_query("""
                                INSERT INTO AUTOR (NOM, PRENOM, INSTITUTION, COUNTRY)
                                VALUES (%(NOM)s, %(PRENOM)s, %(INSTITUTION)s, %(COUNTRY)s)
                            """, author_data)
                            db_service.commit()
                        except Exception as e:
                            print(f"Erreur lors de l'insertion dans la table AUTOR : {str(e)}")
                        author_id = at_service.get_last_inserted_AUTOR_id()
                        author_ids.append(author_id)

                    with tempfile.NamedTemporaryFile(delete=False) as temp_file:
                        file.save(temp_file.name)
                        s3_link = pd_service.upload_pdf(temp_file.name, file.filename)

                    os.remove(temp_file.name)
                    article_data = {
                        'NOCONTRIBUTION': at_service.generate_unique_contribution_number(),
                        'TITRECONTRIBUTION': other_data_dict.get('contributionTitle', ''),
                        'INSTITUTION': other_data_dict.get('institution', ''),
                        'TRRACKPREFERENCE': other_data_dict.get('trackPreference', ''),
                        'MAINTOPIC': other_data_dict.get('mainTopic', ''),
                        'CONTRIBUTIONTYPE': other_data_dict.get('contributionType', ''),
                        'ABSTRACT': other_data_dict.get('abstract', ''),
                        'PDFFILE': s3_link
                    }

                    try:
                        result = db_service.execute_query("""
                            INSERT INTO MATRIX.PUBLIC.ARTICLE_SCIENTIFIQUE (
                                NOCONTRIBUTION, TITRECONTRIBUTION, INSTITUTION, TRRACKPREFERENCE, 
                                MAINTOPIC, CONTRIBUTIONTYPE, ABSTRACT, PDFFILE
                            ) VALUES (
                                %(NOCONTRIBUTION)s, %(TITRECONTRIBUTION)s, %(INSTITUTION)s, %(TRRACKPREFERENCE)s, 
                                %(MAINTOPIC)s, %(CONTRIBUTIONTYPE)s, %(ABSTRACT)s, %(PDFFILE)s
                            )
                        """, article_data)
                        db_service.commit()

                        if result:
                            print("Insertion dans la table ARTICLE_SCIENTIFIQUE réussie!")
                        else:
                            print("Échec de l'insertion dans la table ARTICLE_SCIENTIFIQUE.")
                    except Exception as e:
                        print(f"Erreur lors de l'insertion dans la table ARTICLE_SCIENTIFIQUE : {str(e)}")

                    article_id = at_service.get_last_inserted_article_id()

                    for author_id in author_ids:
                        db_service.execute_query("""
                            INSERT INTO ARTICLE_AUTOR_RELATION (ARTICLE_ID, AUTOR_ID)
                            VALUES (%(ARTICLE_ID)s, %(AUTOR_ID)s)
                        """, {'ARTICLE_ID': article_id, 'AUTOR_ID': author_id})
                        db_service.commit()

                    try:
                        db_service.execute_query("""
                            INSERT INTO USER_ARTICLE (IDUSER, IDARTICLE, STATUS, PAYER)
                            VALUES (%(IDUSER)s, %(IDARTICLE)s, %(STATUS)s, False)
                        """, {'IDUSER': user_id, 'IDARTICLE': article_id, 'STATUS': 'In process'})
                        db_service.commit()

                        

                        print("Insertion dans la table USER_ARTICLE réussie!")
                       
                    except Exception as e:
                        print(f"Erreur lors de l'insertion dans la table USER_ARTICLE : {str(e)}")
                    articles = at_service.get_articles(user_id)
                    user_data= ur_service.get_user_info(user_id)
                    el_service.send_confirmation_email(user_data['email'],article_data,user_data['prenom'])
                    return jsonify({'message': 'Données insérées avec succès','articles':articles,'articleId':article_id}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return jsonify({'message': 'Token manquant'}), 401  # Unauthorized

@articles_routes.route('/predict_status/<article_id>', methods=['POST'])
def predict_status(article_id):
    try:
        token = request.headers.get('Authorization')
        if token:
            token = token.split(" ")[1]
            decoded_token = tn_service.verify_token(token)
            if decoded_token:
                user_id = decoded_token.get('user_id')
                if user_id:
                    file = request.files['file']
                    predicted_status = "In process"
                    try:
                        temp_file_path = tempfile.NamedTemporaryFile(delete=False).name
                        file.save(temp_file_path)
                        prediction = Prediction(temp_file_path)
                        if prediction == [0]:
                            predicted_status = "Verified"
                        else:
                            predicted_status = "Rejected"
                    except Exception as prediction_error:
                        print(f"Erreur lors de la prédiction : {str(prediction_error)}")
                    
                    os.remove(temp_file_path)

                    try:
                        db_service.execute_query("""
                            UPDATE USER_ARTICLE
                            SET STATUS = %(STATUS)s
                            WHERE IDARTICLE = %(ARTICLE_ID)s
                        """, {'ARTICLE_ID': article_id, 'STATUS': predicted_status})
                        db_service.commit()

                        print("Mise à jour du statut dans la table USER_ARTICLE réussie!")
                        user_data= ur_service.get_user_info(user_id)
                        el_service.send_article_processed_email(user_data['email'],user_data['prenom'])
                    except Exception as e:
                        print(f"Erreur lors de la mise à jour dans la table USER_ARTICLE : {str(e)}")

                    articles = at_service.get_articles(user_id)
                    return jsonify({'message': 'Article updated successfully', 'articles': articles}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return jsonify({'message': 'Token manquant'}), 401

@articles_routes.route('/articles', methods=['GET'])
def get_articles():
    token = request.headers.get('Authorization')
    if token:
        token = token.split(" ")[1]
        decoded_token = tn_service.verify_token(token)
        if decoded_token:
            user_id = decoded_token.get('user_id')
            formatted_articles = at_service.get_articles(user_id)
            return jsonify({'articles': formatted_articles}), 200
              
    return jsonify({'message': 'Token manquant'}), 401

@articles_routes.route('/update-payment-status/<string:orderID>', methods=['POST'])
def update_payment_status(orderID):
    try:
        token = request.headers.get('Authorization')
        if token:
            token = token.split(" ")[1]
            decoded_token = tn_service.verify_token(token)
            if decoded_token:
                user_id = decoded_token.get('user_id')
                if user_id:
                    data = request.get_json()
                    new_status = data.get('status')

                    try:
                        db_service.execute_query("""
                            UPDATE USER_ARTICLE
                            SET STATUS = %(new_status)s,
                                PAYER = TRUE
                            WHERE IDARTICLE = %(orderID)s
                        """, {'new_status': new_status, 'orderID': orderID})
                        db_service.commit()
                    except Exception as e:
                        return jsonify({'error': f'Erreur lors de la mise à jour du statut de paiement : {str(e)}'}), 500
                    articles = at_service.get_articles(user_id)
                    # Répondez avec un succès si la mise à jour a réussi
                    return jsonify({'message': 'Statut de paiement et PAYER mis à jour avec succès dans la base de données.','articles':articles}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@articles_routes.route('/get_article_data/<int:article_id>', methods=['GET'])
def get_article_data(article_id):
    token = request.headers.get('Authorization')
    if token:
        token = token.split(" ")[1]
        decoded_token = tn_service.verify_token(token)
        if decoded_token:
            user_id = decoded_token.get('user_id')
            if user_id:
                try:
                    # SQL query for article data
                    article_query = """
                        SELECT
                            ID, NOCONTRIBUTION, TITRECONTRIBUTION, INSTITUTION,
                            TRRACKPREFERENCE, MAINTOPIC, CONTRIBUTIONTYPE, ABSTRACT, PDFFILE
                        FROM
                            MATRIX.PUBLIC.ARTICLE_SCIENTIFIQUE
                        WHERE
                            ID = %(article_id)s
                    """
                    article_data = db_service.execute_query(article_query, {'article_id': article_id})
                    article_dict = {
                        'ID': article_data[0],
                        'NOCONTRIBUTION': article_data[1],
                        'TITRECONTRIBUTION': article_data[2],
                        'INSTITUTION': article_data[3],
                        'TRRACKPREFERENCE': article_data[4],
                        'MAINTOPIC': article_data[5],
                        'CONTRIBUTIONTYPE': article_data[6],
                        'ABSTRACT': article_data[7],
                        'PDFFILE': article_data[8]
                    }
                except Exception as e:
                    return jsonify({'error': f'Failed to retrieve article data: {str(e)}'}), 500

                try:
                    authors_query = """
                        SELECT
                            AU.NOM,
                            AU.PRENOM,
                            AU.INSTITUTION,
                            AU.COUNTRY 
                        FROM
                            MATRIX.PUBLIC.AUTOR AU
                        INNER JOIN
                            MATRIX.PUBLIC.ARTICLE_AUTOR_RELATION AAR
                        ON
                            AU.ID = AAR.AUTOR_ID
                        WHERE
                            AAR.ARTICLE_ID = %(article_id)s
                    """
                    authors_data = db_service.execute_query_all(authors_query, {'article_id': article_id})
                    
                    # Initialize an empty list for authors
                    authors_list = []
                    print(authors_data)

                    if authors_data:
                        for author_tuple in authors_data:
                            author_dict = {
                                'AUTHOR_LAST_NAME': author_tuple[0],
                                'AUTHOR_FIRST_NAME': author_tuple[1],
                                'AUTHOR_INSTITUTION': author_tuple[2],
                                'AUTHOR_COUNTRY': author_tuple[3]
                            }
                            authors_list.append(author_dict)

                except Exception as e:
                    return jsonify({'error': f'Failed to retrieve author data: {str(e)}'}), 500



                # Combine article and author data
                article_info = {
                    'article_data': article_dict,
                    'authors_data': authors_list
                }
                return jsonify({'article_info': article_info}), 200

    return jsonify({'message': 'Token manquant'}), 401

@articles_routes.route('/update_article_data/<article_id>', methods=['POST'])
def update_article_data(article_id):
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'message': 'Authorization token required'}), 401

    token = token.split(" ")[1]
    decoded_token = tn_service.verify_token(token)
    if not decoded_token:
        return jsonify({'message': 'Invalid token'}), 401

    user_id = decoded_token.get('user_id')
    if not user_id:
        return jsonify({'message': 'User ID not found'}), 404

    no_contribution = request.form.get('noContribution')
    title = request.form.get('title')
    institution = request.form.get('institution')
    track_preference = request.form.get('trackPreference')
    main_topic = request.form.get('mainTopic')
    contribution_type = request.form.get('contributionType')
    abstract = request.form.get('abstract')

    article_update_data = {
        'NOCONTRIBUTION': no_contribution,
        'TITRECONTRIBUTION': title,
        'INSTITUTION': institution,
        'TRRACKPREFERENCE': track_preference,
        'MAINTOPIC': main_topic,
        'CONTRIBUTIONTYPE': contribution_type,
        'ABSTRACT': abstract,
        'ARTICLE_ID': article_id
    }

    db_service.execute_query("""
        UPDATE MATRIX.PUBLIC.ARTICLE_SCIENTIFIQUE
        SET NOCONTRIBUTION = %(NOCONTRIBUTION)s, TITRECONTRIBUTION = %(TITRECONTRIBUTION)s,
            INSTITUTION = %(INSTITUTION)s, TRRACKPREFERENCE = %(TRRACKPREFERENCE)s,
            MAINTOPIC = %(MAINTOPIC)s, CONTRIBUTIONTYPE = %(CONTRIBUTIONTYPE)s,
            ABSTRACT = %(ABSTRACT)s
        WHERE ID = %(ARTICLE_ID)s
    """, article_update_data)

    file = request.files.get('file')
    if file:
        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            file.save(temp_file.name)
            s3_link = pd_service.upload_pdf(temp_file.name, file.filename)
        os.remove(temp_file.name)
        db_service.execute_query("""
            UPDATE MATRIX.PUBLIC.ARTICLE_SCIENTIFIQUE
            SET PDFFILE = %(PDFFILE)s
            WHERE ID = %(ARTICLE_ID)s
        """, {'PDFFILE': s3_link, 'ARTICLE_ID': article_id})

    try:
        db_service.execute_query("""
            UPDATE USER_ARTICLE
            SET STATUS = 'Published'
            WHERE IDARTICLE = %(ARTICLE_ID)s
        """, {'ARTICLE_ID': article_id})
        db_service.commit()

        print("Mise à jour du statut dans la table USER_ARTICLE réussie!")
    except Exception as e:
        print(f"Erreur lors de la mise à jour dans la table USER_ARTICLE : {str(e)}")

    articles = at_service.get_articles(user_id)
    db_service.commit()
    return jsonify({'message': 'Article updated successfully', 'articles': articles}), 200
