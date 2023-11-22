from flask import Blueprint, request, jsonify
from app.services import db_service, tn_service, el_service , ur_service
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt()
from flask import redirect


auth_routes = Blueprint('auth_routes', __name__)

@auth_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    result = db_service.execute_query("SELECT id_user, motdepasse FROM Coordonnees WHERE email = %s", (data['email'],))
    if result:
        user_id, hashed_password = result
        if bcrypt.check_password_hash(hashed_password, data['password']):
            token = tn_service.generate_token(user_id)
            return jsonify({'message': 'Connexion réussie', 'token': token}), 200
        else:
            return jsonify({'message': 'Mot de passe incorrect'}), 401  # Unauthorized
    else:
        return jsonify({'message': "L'email n'existe pas"}), 404  # Not Found


@auth_routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    result = db_service.execute_query("SELECT COUNT(*) FROM Coordonnees WHERE email = %s", (data['email'],))[0]

    if result > 0:
        return jsonify({'message': 'Cet e-mail est déjà utilisé'}), 400  # Bad Request

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    db_service.execute_query("INSERT INTO Utilisateur (nom, prenom, datedenaisance, sexe) VALUES (%s, %s, %s, %s)",
                (data['lastname'], data['firstname'], None, None))
    
    user_id = db_service.execute_query("SELECT ID FROM Utilisateur ORDER BY ID DESC LIMIT 1")[0]

    verification_token = tn_service.generate_unique_verification_token()  
    
    db_service.execute_query("INSERT INTO Coordonnees (id_user, email, phonenumber, motdepasse,PHONE_VERIFIED,EMAIL_VERIFIED,VERIFICATION_TOKEN) VALUES (%s, %s, %s, %s, %s, %s, %s )",
                (user_id, data['email'], None, hashed_password,False,False, verification_token))

    db_service.commit()

    return jsonify({'message': 'Compte créé avec succès'}), 201  # Created


@auth_routes.route('/send_verifyMail/<int:user_id>', methods=['POST'])
def send_verifyMail(user_id):
    try:
        print("Received user_id:", user_id)
        result = db_service.execute_query("SELECT VERIFICATION_TOKEN FROM Coordonnees WHERE id_user = %s", (user_id,))
        
        if result and result[0]:
            verification_token = result[0]
            data = ur_service.get_user_info(user_id)
            print(data)
            print("Sending email to:", data['email'])
            el_service.send_verification_email(data['email'], verification_token, data['prenom'])
            return jsonify({'message': 'Email de vérification envoyé avec succès'}), 200
        return jsonify({'message': "Utilisateur non trouvé"}), 404
    except Exception as e:
        return jsonify({'message': "Erreur lors de l'envoi de l'email de vérification", 'error': str(e)}), 500



@auth_routes.route('/verify/<token>', methods=['GET'])
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

@auth_routes.route('/verifyToken', methods=['POST'])
def verify_token():
    token = request.headers.get('Authorization')  # Récupère le token depuis l'en-tête Authorization
    if token:
        token = token.split(" ")[1]  # Supprime 'Bearer ' du token
        decoded_token = tn_service.verify_token(token)
        user_id = decoded_token.get('user_id') 
        expiration_str = decoded_token.get('exp') 
        if user_id and expiration_str:
            return jsonify({'user_id': user_id, 'exp': expiration_str}), 200
        else:
            return jsonify({'message': 'Token invalide'}), 401  # Unauthorized
    else:
        return jsonify({'message': 'Token manquant'}), 401  # Unauthorized