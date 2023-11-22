from flask import Blueprint, request, jsonify
from app.services import db_service, tn_service, el_service , ur_service, ph_service
from flask import redirect

verify_routes = Blueprint('verify_routes', __name__)


@verify_routes.route('/send_verifyMail/<int:user_id>', methods=['POST'])
def send_verifyMail(user_id):
    try:
        result = db_service.execute_query("SELECT VERIFICATION_TOKEN FROM Coordonnees WHERE id_user = %s", (user_id,))
        
        if result and result[0]:
            verification_token = result[0]
            data = ur_service.get_user_info(user_id)
            el_service.send_verification_email(data['email'], verification_token, data['prenom'])
            return jsonify({'message': 'Email de vérification envoyé avec succès'}), 200
        return jsonify({'message': "Utilisateur non trouvé"}), 404
    except Exception as e:
        return jsonify({'message': "Erreur lors de l'envoi de l'email de vérification", 'error': str(e)}), 500

@verify_routes.route('/send_verifyPhone/<int:user_id>', methods=['POST'])
def send_verifyPhone(user_id):
    try:
        result = ur_service.get_user_info(user_id)
        if result :
            phone_number = result['phonenumber']
            verification = ph_service.initiate_verification(phone_number)
            if verification.status == 'pending':
                return jsonify({'message': 'Code de vérification envoyé avec succès', 'user_id':user_id}), 200
            else:
                return jsonify({'message': 'Échec de l\'envoi du code de vérification'}), 500
        return jsonify({'message': "Utilisateur non trouvé"}), 404
    except Exception as e:
        return jsonify({'message': "Erreur lors de l'envoi du code de vérification", 'error': str(e)}), 500

from flask import request

@verify_routes.route('/verify_phone/<int:user_id>', methods=['POST'])
def verify_phone(user_id):
    try:
        code = request.json.get('code')
        if code:
            result = ur_service.get_user_info(user_id)
            check = ph_service.check_verification(result['phonenumber'], code)  
            if check and check.status == 'approved':
                db_service.execute_query("UPDATE Coordonnees SET PHONE_VERIFIED = TRUE WHERE ID = %s", (user_id,))
                db_service.commit()
                user_data = ur_service.get_user_info(user_id)
                return jsonify({'message': 'Code de vérification correct', 'phone_verified': user_data['phone_verified']}), 200
            else:
                return jsonify({'message': 'Le code de vérification est invalide ou a expiré'}), 404
        
        return jsonify({'message': 'Aucun code de vérification fourni'}), 400
    
    except Exception as e:
        return jsonify({'message': 'Erreur lors de la vérification du code de téléphone', 'error': str(e)}), 500


@verify_routes.route('/verify/<token>', methods=['GET'])
def verify_email(token):
    user_id = db_service.execute_query("SELECT * FROM Coordonnees WHERE VERIFICATION_TOKEN = %s", (token,))
    if user_id:
        user_id = user_id[0] 
        print(user_id)
        db_service.execute_query("UPDATE Coordonnees SET EMAIL_VERIFIED = TRUE WHERE ID = %s", (user_id,))
        db_service.commit()
        return redirect('http://localhost:3000/dashboard/default'), 302
    else:
        return jsonify({'message': 'Le lien de vérification est invalide ou a expiré'}), 404

@verify_routes.route('/verifyToken', methods=['POST'])
def verify_token():
    token = request.headers.get('Authorization')  
    if token:
        token = token.split(" ")[1] 
        decoded_token = tn_service.verify_token(token)
        user_id = decoded_token.get('user_id') 
        expiration_str = decoded_token.get('exp') 
        if user_id and expiration_str:
            return jsonify({'user_id': user_id, 'exp': expiration_str}), 200
        else:
            return jsonify({'message': 'Token invalide'}), 401  # Unauthorized
    else:
        return jsonify({'message': 'Token manquant'}), 401  # Unauthorized