from .database_service import DatabaseService
from .email_service import EmailService
from .token_service import TokenService
from .user_service import UserService

# Initialisation des services
db_service = DatabaseService()
el_service = EmailService()
tn_service = TokenService('matrix')
ur_service = UserService()