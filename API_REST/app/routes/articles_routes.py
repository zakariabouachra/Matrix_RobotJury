from flask import Blueprint, request, jsonify, json
from app.services import db_service, tn_service, pd_service, at_service, el_service, ur_service
import os
import tempfile

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
                            INSERT INTO USER_ARTICLE (IDUSER, IDARTICLE, STATUS)
                            VALUES (%(IDUSER)s, %(IDARTICLE)s, %(STATUS)s)
                        """, {'IDUSER': user_id, 'IDARTICLE': article_id, 'STATUS': 'Verified'})
                        db_service.commit()

                        

                        print("Insertion dans la table USER_ARTICLE réussie!")
                    except Exception as e:
                        print(f"Erreur lors de l'insertion dans la table USER_ARTICLE : {str(e)}")
                    articles = at_service.get_articles(user_id)
                    user_data= ur_service.get_user_info(user_id)
                    el_service.send_confirmation_email(user_data['email'],article_data,user_data['prenom'])
                    return jsonify({'message': 'Données insérées avec succès','articles':articles}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return jsonify({'message': 'Token manquant'}), 401  # Unauthorized

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




