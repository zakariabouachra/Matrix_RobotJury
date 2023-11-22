from flask import Blueprint, request, jsonify
from app.services import db_service, tn_service
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt()


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

    return jsonify({'message': 'Compte créé avec succès',"user_id" : user_id}), 201  # Created


