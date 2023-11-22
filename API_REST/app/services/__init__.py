from .database_service import DatabaseService
from .email_service import EmailService
from .token_service import TokenService
from .user_service import UserService
from .phone_service import PhoneService

# Initialisation des services
db_service = DatabaseService()
el_service = EmailService()
tn_service = TokenService('matrix')
ur_service = UserService()
ph_service = PhoneService()