from flask import Flask, request, jsonify
import snowflake.connector
from flask_cors import CORS 
from flask_bcrypt import Bcrypt
import jwt
from datetime import datetime, timedelta
import secrets
import string
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
from flask import redirect, url_for


app = Flask(__name__)
CORS(app) 
bcrypt = Bcrypt(app)


def generate_unique_verification_token(length=30):
    alphabet = string.ascii_letters + string.digits
    token = ''.join(secrets.choice(alphabet) for _ in range(length))
    return token


def send_matrix_email(email, verification_token, user_name):
    sender_email = 'matrixscientifiqueevolution@gmail.com'
    receiver_email = email
    subject = 'Email Verification - Matrix Scientifique Evolution'

    # Création du message Multipart
    message = MIMEMultipart("alternative")
    message["Subject"] = subject
    message["From"] = sender_email
    message["To"] = receiver_email

    # Lien de vérification dans le corps du message HTML
    verification_link = f"http://localhost:5000/verify/{verification_token}"

    # Corps du message en format HTML avec styles CSS intégrés et logo de l'entreprise
    html = f"""
    <html>
      <head>
        <style>
          body {{
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 20px;
          }}
          .container {{
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }}
          img {{
            max-width: 100%;
            height: auto;
          }}
          h1 {{
            color: #333333;
            font-size: 24px;
          }}
          p {{
            font-size: 16px;
            color: #555555;
            margin-bottom: 15px;
          }}
          .btn {{
            display: inline-block;
            padding: 10px 20px;
            background-color: #0066cc;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
          }}
          .footer-text {{
            font-style: italic;
            color: #999999;
            margin-top: 20px;
          }}
        </style>
      </head>
      <body>
        <div class="container">
          <img src="lien_vers_votre_logo" alt="Matrix Scientifique Evolution Logo">
          <h1>Hello {user_name},</h1>
          <p>Your administrator has requested you to verify your email address.</p>
          <p>To complete email verification, please click the button below:</p>
          <a href="{verification_link}" class="btn">Verify your email address</a>
          <p>This link will expire in 7 days.</p>
          <p class="footer-text">Regards,<br />The Matrix Scientifique Evolution Team</p>
        </div>
      </body>
    </html>
    """

    html_part = MIMEText(html, "html")
    message.attach(html_part)

    try:
        smtp_server = smtplib.SMTP('smtp.gmail.com', 587)
        smtp_server.starttls()
        smtp_server.login(sender_email, 'Lilopipo09@')
        smtp_server.sendmail(sender_email, receiver_email, message.as_string())
        smtp_server.quit()
        print('E-mail envoyé avec succès!')
    except Exception as e:
        print(f'Erreur lors de l\'envoi de l\'e-mail : {str(e)}')



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
            expiration_timestamp = int(expiration.timestamp())
            token_data = {'user_id': user_id, 'exp': expiration_timestamp}
            token = jwt.encode(token_data, 'matrix', algorithm='HS256')
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

    verification_token = generate_unique_verification_token()  

    cur.execute("INSERT INTO Coordonnees (id_user, email, phonenumber, motdepasse,PHONE_VERIFIED,EMAIL_VERIFIED,VERIFICATION_TOKEN) VALUES (%s, %s, %s, %s, %s)",
                (user_id, data['email'], None, hashed_password,False,False, verification_token))

    conn.commit()

    send_matrix_email(data['email'], verification_token, data['firstname'])

    return jsonify({'message': 'Compte créé avec succès'}), 201  # Created

@app.route('/verify/<token>', methods=['GET'])
def verify_email(token):
    cur.execute("SELECT * FROM Utilisateur WHERE verification_token = %s", (token,))
    user = cur.fetchone()

    if user:
        cur.execute("UPDATE Utilisateur SET EMAIL_VERIFIED = True WHERE id = %s", (user['id'],))
        conn.commit()
        return redirect(url_for('http://localhost:3000/dashboard/default', message='Adresse e-mail vérifiée avec succès')), 302
    else:
        return jsonify({'message': 'Le lien de vérification est invalide ou a expiré'}), 404

@app.route('/verifyToken', methods=['POST'])
def verify_token():
    token = request.headers.get('Authorization')  # Récupère le token depuis l'en-tête Authorization
    if token:
        try:
            token = token.split(" ")[1]  # Supprime 'Bearer ' du token
            decoded_token = jwt.decode(token, 'matrix', algorithms=['HS256'])
            user_id = decoded_token.get('user_id') 
            expiration_str = decoded_token.get('exp') 
            if user_id and expiration_str:
                return jsonify({'user_id': user_id, 'exp': expiration_str}), 200
            else:
                return jsonify({'message': 'Token invalide'}), 401  # Unauthorized
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expiré'}), 401  # Unauthorized
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token invalide'}), 401  # Unauthorized
    else:
        return jsonify({'message': 'Token manquant'}), 401  # Unauthorized

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
            'codepostal': user_info['CODEPOSTAL'],
            'credit_number': user_info['CREDITNUMBER'],
            'name_card':user_info['NAME_CARD'],
            'expiration_date': user_info['EXPIRATIONDATE'],
            'cvv': user_info['CVV']
        }
        return jsonify(combined_info), 200
    else:
        return jsonify({'message': "Utilisateur non trouvé"}), 404

@app.route('/user_information/<int:user_id>', methods=['PUT'])
def update_user_information(user_id):
    token = request.headers.get('Authorization')  # Récupère le token depuis l'en-tête Authorization
    if token:
        try:
            token = token.split(" ")[1]  # Supprime 'Bearer ' du token
            decoded_token = jwt.decode(token, 'matrix', algorithms=['HS256'])
            if decoded_token:
                data = request.get_json()

                cur.execute("SELECT COUNT(*) FROM Utilisateur WHERE ID = %s", (user_id,))
                user_exists = cur.fetchone()[0]

                if user_exists:
                    formatted_date = datetime.strptime(data.get('datedenaisance'), '%d/%m/%Y').strftime('%Y-%m-%d')
                    cur.execute("""
                        UPDATE Utilisateur 
                        SET nom = %s, prenom = %s, datedenaisance = %s, sexe = %s 
                        WHERE ID = %s
                    """, (data.get('nom'), data.get('prenom'), formatted_date, data.get('sexe'), user_id))
                    
                    conn.commit()

                    return jsonify({'message': 'Informations utilisateur mises à jour'}), 200
                else:
                    return jsonify({'message': 'Utilisateur non trouvé'}), 404
        except jwt.ExpiredSignatureError:
                    return jsonify({'message': 'Token expiré'}), 401  # Unauthorized
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token invalide'}), 401  # Unauthorized
    else:
        return jsonify({'message': 'Token manquant'}), 401  # Unauthorized

@app.route('/user_coordonnees/<int:user_id>', methods=['PUT'])
def update_user_coordonnees(user_id):
    token = request.headers.get('Authorization')  # Récupère le token depuis l'en-tête Authorization
    if token:
        try:
            token = token.split(" ")[1] 
            decoded_token = jwt.decode(token, 'matrix', algorithms=['HS256'])
            if decoded_token:
                data = request.get_json()

                cur.execute("SELECT COUNT(*) FROM Utilisateur WHERE ID = %s", (user_id,))
                user_exists = cur.fetchone()[0]

                if user_exists:
                    cur.execute("""
                        UPDATE Coordonnees 
                        SET email = %s, phonenumber = %s 
                        WHERE id_user = %s
                    """, (data.get('email'), data.get('phonenumber'), user_id))

                    conn.commit()

                    return jsonify({'message': 'Informations utilisateur mises à jour'}), 200
                else:
                    return jsonify({'message': 'Utilisateur non trouvé'}), 404
        except jwt.ExpiredSignatureError:
                    return jsonify({'message': 'Token expiré'}), 401  # Unauthorized
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token invalide'}), 401  # Unauthorized
    else:
        return jsonify({'message': 'Token manquant'}), 401  # Unauthorized

@app.route('/address/<int:user_id>', methods=['PUT'])
def update_address(user_id):
    token = request.headers.get('Authorization')  # Récupère le token depuis l'en-tête Authorization
    if token:
        try:
            token = token.split(" ")[1]  # Supprime 'Bearer ' du token
            decoded_token = jwt.decode(token, 'matrix', algorithms=['HS256'])
            if decoded_token:
                data = request.get_json()
                print(data)

                cur.execute("SELECT COUNT(*) FROM Utilisateur WHERE ID = %s", (user_id,))
                user_exists = cur.fetchone()[0]

                if user_exists:
                    cur.execute("SELECT COUNT(*) FROM ADRESSE WHERE id_user = %s", (user_id,))
                    address_exists = cur.fetchone()[0]

                    if address_exists:
                        cur.execute("""
                            UPDATE ADRESSE 
                            SET adresse = %s, city = %s, CODEPOSTAL = %s, country = %s
                            WHERE id_user = %s
                        """, (data.get('adresse'), data.get('city'), data.get('codepostal'), data.get('country'), user_id))
                    else:
                        cur.execute("""
                            INSERT INTO ADRESSE (id_user, adresse, city, CODEPOSTAL, country) 
                            VALUES (%s, %s, %s, %s, %s)
                        """, (user_id, data.get('adresse'), data.get('city'), data.get('codepostal'), data.get('country')))
                    
                    conn.commit()
                    return jsonify({'message': 'Informations d\'adresse mises à jour'}), 200
                else:
                    return jsonify({'message': 'Utilisateur non trouvé'}), 404
        except jwt.ExpiredSignatureError:
                    return jsonify({'message': 'Token expiré'}), 401  # Unauthorized
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token invalide'}), 401  # Unauthorized
    else:
        return jsonify({'message': 'Token manquant'}), 401  # Unauthorized

if __name__ == '__main__':
    app.run(debug=True)
