from flask import Blueprint, request, jsonify
from app.services import db_service, tn_service, el_service, ur_service

articles_routes = Blueprint('articles_routes', __name__)

def get_last_inserted_article_id():
    result = db_service.execute_query("""
        SELECT MAX(ID) FROM MATRIX.PUBLIC.ARTICLE_SCIENTIFIQUE
    """)

    print(result)
    return result[0][0] if result and result[0][0] else None

@articles_routes.route('/article_information', methods=['POST'])
def receive_data():
    token = request.headers.get('Authorization')
    if token:
        token = token.split(" ")[1]
        decoded_token = tn_service.verify_token(token)
        if decoded_token:
            user_id = decoded_token.get('user_id')
            if user_id:
                try:
                    data = request.get_json()
                    print(data)
                    authors_data = data.get('authors', [])
                    print(authors_data)

                    author_ids = []

                    for author in authors_data:
                        author_data = {
                            'NOM': author.get('lastName', ''),
                            'PRENOM': author.get('firstName', ''),
                            'INSTITUTION': author.get('institution', ''),
                            'COUNTRY': author.get('country', '')
                        }
                        print(author)
                        db_service.execute_query("""
                            INSERT INTO MATRIX.PUBLIC.AUTOR (NOM, PRENOM, INSTITUTION, COUNTRY)
                            VALUES (%(NOM)s, %(PRENOM)s, %(INSTITUTION)s, %(COUNTRY)s)
                        """, author_data)
                        db_service.commit()

                        author_id = get_last_inserted_article_id()
                        print(author_id)
                        author_ids.append(author_id)
                        

                    article_data = {
                        'NOCONTRIBUTION': data['contributionNumber'],
                        'TITRECONTRIBUTION': data['contributionTitle'],
                        'INSTITUTION': data['institution'],
                        'TRRACKPREFERENCE': data['trackPreference'],
                        'MAINTOPIC': data['mainTopic'],
                        'CONTRIBUTIONTYPE': data['contributionType'],
                        'ABSTRACT': data['abstract'],
                        'PDFFILE': data['selectedFile'],
                    }

                    db_service.execute_query("""
                        INSERT INTO MATRIX.PUBLIC.ARTICLE_SCIENTIFIQUE (
                            NOCONTRIBUTION, TITRECONTRIBUTION, INSTITUTION, TRRACKPREFERENCE, 
                            MAINTOPIC, CONTRIBUTIONTYPE, ABSTRACT, PDFFILE
                        ) VALUES (
                            %(NOCONTRIBUTION)s, %(TITRECONTRIBUTION)s, %(INSTITUTION)s, %(TRRACKPREFERENCE)s, 
                            %(MAINTOPIC)s, %(CONTRIBUTIONTYPE)s, %(ABSTRACT)s, %(PDFFILE)s
                        )
                    """, article_data)
                    db_service.commit()

                    article_id = get_last_inserted_article_id()

                    for author_id in author_ids:
                        db_service.execute_query("""
                            INSERT INTO MATRIX.PUBLIC.ARTICLE_AUTOR_RELATION (ARTICLE_ID, AUTOR_ID)
                            VALUES (%(ARTICLE_ID)s, %(AUTOR_ID)s)
                        """, {'ARTICLE_ID': article_id, 'AUTOR_ID': author_id})
                        db_service.commit()

                    return jsonify({'message': 'Données insérées avec succès'}), 200
                except Exception as e:
                    return jsonify({'error': str(e)}), 500
    return jsonify({'message': 'Token manquant'}), 401  # Unauthorized
