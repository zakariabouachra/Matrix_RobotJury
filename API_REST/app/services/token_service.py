import jwt
from datetime import datetime, timedelta
import secrets
import string

class TokenService:
    def __init__(self, secret_key):
        self.secret_key = secret_key

    def generate_token(self, user_id):
        expiration = datetime.utcnow() + timedelta(hours=1)
        expiration_timestamp = int(expiration.timestamp())
        token_data = {'user_id': user_id, 'exp': expiration_timestamp}
        token = jwt.encode(token_data, self.secret_key, algorithm='HS256')
        return token

    def verify_token(self, token):
        try:
            decoded_token = jwt.decode(token, self.secret_key, algorithms=['HS256'])
            return decoded_token
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None

    def generate_unique_verification_token(self, length=30):
        alphabet = string.ascii_letters + string.digits
        token = ''.join(secrets.choice(alphabet) for _ in range(length))
        return token
