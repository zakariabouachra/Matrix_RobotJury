from flask import Flask, request, jsonify
import snowflake.connector
from flask_cors import CORS 
from flask_bcrypt import Bcrypt
import jwt
from datetime import datetime, timedelta




app = Flask(__name__)
CORS(app) 
bcrypt = Bcrypt(app)

# Connexion à Snowflake
conn = snowflake.connector.connect(
    user='zakariabouachra',
    password='Lilopipo09@',
    account='iwphmqq-ht33884',
    warehouse='COMPUTE_WH',
    database='MATRIX',
    schema='PUBLIC'  
)

cur = conn.cursor()



@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    cur.execute("SELECT id_user, motdepasse FROM Coordonnees WHERE email = %s", (data['email'],))
    result = cur.fetchone()

    if result:
        user_id, hashed_password = result
        if bcrypt.check_password_hash(hashed_password, data['password']):
            expiration = datetime.utcnow() + timedelta(hours=1)
            expiration_str = expiration.strftime('%Y-%m-%dT%H:%M:%SZ')
            token_data = {'user_id': user_id, 'exp': expiration_str}
            token = jwt.encode(token_data, 'matrix@', algorithm='HS256')
            return jsonify({'message': 'Connexion réussie', 'token': token}), 200
        else:
            return jsonify({'message': 'Mot de passe incorrect'}), 401  # Unauthorized
    else:
        return jsonify({'message': "L'email n'existe pas"}), 404  # Not Found


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    cur.execute("SELECT COUNT(*) FROM Coordonnees WHERE email = %s", (data['email'],))
    result = cur.fetchone()[0]

    if result > 0:
        return jsonify({'message': 'Cet e-mail est déjà utilisé'}), 400  # Bad Request

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    cur.execute("INSERT INTO Utilisateur (nom, prenom, datedenaisance, sexe) VALUES (%s, %s, %s, %s)",
                (data['lastname'], data['firstname'], None, None))

    cur.execute("SELECT ID FROM Utilisateur ORDER BY ID DESC LIMIT 1")
    user_id = cur.fetchone()[0] 

    cur.execute("INSERT INTO Coordonnees (id_user, email, phonenumber, motdepasse) VALUES (%s, %s, %s, %s)",
                (user_id, data['email'], None, hashed_password))

    conn.commit()

    return jsonify({'message': 'Compte créé avec succès','user_id': user_id}), 201  # Created


@app.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    cur.execute("""
        SELECT 
            u.*, c.*, a.*, p.*
        FROM 
            Utilisateur u
        INNER JOIN 
            Coordonnees c ON u.ID = c.id_user
        LEFT JOIN 
            adresse a ON u.ID = a.id_user
        LEFT JOIN
            PAIEMENT p ON u.ID = p.ID_USER
        WHERE 
            u.ID = %s
    """, (user_id,))
    
    user_data = cur.fetchone()
    if user_data:
        user_columns = [col[0] for col in cur.description]
        user_info = dict(zip(user_columns, user_data))
        print(user_info)

        combined_info = {
            'user_id': user_id,
            'nom': user_info['NOM'],
            'prenom': user_info['PRENOM'],
            'datedenaisance': user_info['DATEDENAISANCE'],
            'sexe': user_info['SEXE'],
            'email': user_info['EMAIL'],
            'phonenumber': user_info['PHONENUMBER'],
            'motdepasse': user_info['MOTDEPASSE'],
            'country': user_info['COUNTRY'],
            'city': user_info['CITY'],
            'adresse': user_info['ADRESSE'],
            'postalcode': user_info['CODEPOSTAL'],
            'credit_number': user_info['CREDITNUMBER'],
            'name_card':user_info['NAME_CARD'],
            'expiration_date': user_info['EXPIRATIONDATE'],
            'cvv': user_info['CVV']
        }
        return jsonify(combined_info), 200
    else:
        return jsonify({'message': "Utilisateur non trouvé"}), 404



if __name__ == '__main__':
    app.run(debug=True)
