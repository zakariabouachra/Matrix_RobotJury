from flask import Blueprint, request, jsonify
from app.services import db_service, tn_service ,ur_service
from datetime import datetime

user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    combined_info = ur_service.get_user_info(user_id)
    if combined_info: 
        return jsonify(combined_info), 200
    else:
        return jsonify({'message': "Utilisateur non trouvé"}), 404

@user_routes.route('/user_information/<int:user_id>', methods=['PUT'])
def update_user_information(user_id):
    token = request.headers.get('Authorization')  # Récupère le token depuis l'en-tête Authorization
    if token:
        token = token.split(" ")[1]
        decoded_token = tn_service.verify_token(token)
        if decoded_token:
            data = request.get_json()

            user_exists = db_service.execute_query("SELECT COUNT(*) FROM Utilisateur WHERE ID = %s", (user_id,))[0]

            if user_exists:
                formatted_date = datetime.strptime(data.get('datedenaisance'), '%d/%m/%Y').strftime('%Y-%m-%d')
                db_service.execute_query("""
                    UPDATE Utilisateur 
                    SET nom = %s, prenom = %s, datedenaisance = %s, sexe = %s 
                    WHERE ID = %s
                """, (data.get('nom'), data.get('prenom'), formatted_date, data.get('sexe'), user_id))
                
                db_service.commit()

                user_data = ur_service.get_user_info(user_id)

                return jsonify({'message': 'Informations utilisateur mises à jour' , 'user_data': user_data}), 200
            else:
                return jsonify({'message': 'Utilisateur non trouvé'}), 404
    else:
        return jsonify({'message': 'Token manquant'}), 401  # Unauthorized

@user_routes.route('/user_coordonnees/<int:user_id>', methods=['PUT'])
def update_user_coordonnees(user_id):
    token = request.headers.get('Authorization')  # Récupère le token depuis l'en-tête Authorization
    if token:
        token = token.split(" ")[1] 
        decoded_token = tn_service.verify_token(token)
        if decoded_token:
            data = request.get_json()

            user_exists = db_service.execute_query("SELECT COUNT(*) FROM Utilisateur WHERE ID = %s", (user_id,))[0]

            if user_exists:
                db_service.execute_query("""
                    UPDATE Coordonnees 
                    SET PHONE_VERIFIED = FALSE 
                    WHERE id_user = %s AND phonenumber != %s
                """, (user_id,data.get('phonenumber')))

                db_service.commit()

                db_service.execute_query("""
                    UPDATE Coordonnees 
                    SET EMAIL_VERIFIED = FALSE 
                    WHERE id_user = %s AND email != %s
                """, (user_id, data.get('email')))

                db_service.commit()

                verification_token = tn_service.generate_unique_verification_token()


                db_service.execute_query("""
                    UPDATE Coordonnees 
                    SET email = %s, phonenumber = %s , VERIFICATION_TOKEN = %s
                    WHERE id_user = %s
                """, (data.get('email'), data.get('phonenumber'), verification_token, user_id))

                db_service.commit()

                user_data = ur_service.get_user_info(user_id)

                return jsonify({'message': 'Informations utilisateur mises à jour','user_data': user_data}), 200
            else:
                return jsonify({'message': 'Utilisateur non trouvé'}), 404
       
    else:
        return jsonify({'message': 'Token manquant'}), 401  # Unauthorized

@user_routes.route('/address/<int:user_id>', methods=['PUT'])
def update_address(user_id):
    token = request.headers.get('Authorization')  
    if token:
        token = token.split(" ")[1]  
        decoded_token = tn_service.verify_token(token)
        if decoded_token:
            data = request.get_json()
            print(data)

            user_exists = db_service.execute_query("SELECT COUNT(*) FROM Utilisateur WHERE ID = %s", (user_id,))[0]

            if user_exists:
                address_exists = db_service.execute_query("SELECT COUNT(*) FROM ADRESSE WHERE id_user = %s", (user_id,))[0]

                if address_exists:
                    db_service.execute_query("""
                        UPDATE ADRESSE 
                        SET adresse = %s, city = %s, CODEPOSTAL = %s, country = %s
                        WHERE id_user = %s
                    """, (data.get('adresse'), data.get('city'), data.get('codepostal'), data.get('country'), user_id))
                else:
                    db_service.execute_query("""
                        INSERT INTO ADRESSE (id_user, adresse, city, CODEPOSTAL, country) 
                        VALUES (%s, %s, %s, %s, %s)
                    """, (user_id, data.get('adresse'), data.get('city'), data.get('codepostal'), data.get('country')))
                
                db_service.commit()

                user_data = ur_service.get_user_info(user_id)
                return jsonify({'message': 'Informations d\'adresse mises à jour','user_data': user_data}), 200
            else:
                return jsonify({'message': 'Utilisateur non trouvé'}), 404

    else:
        return jsonify({'message': 'Token manquant'}), 401  # Unauthorized
    

