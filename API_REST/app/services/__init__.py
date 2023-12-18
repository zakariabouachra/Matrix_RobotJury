from .database_service import DatabaseService
from .email_service import EmailService
from .token_service import TokenService
from .user_service import UserService
from .phone_service import PhoneService
from .aws_service import AWSService
from .article_service import ArticleService

# Initialisation des services
db_service = DatabaseService()
el_service = EmailService()
tn_service = TokenService('matrix')
ur_service = UserService()
ph_service = PhoneService()
aw_service = AWSService()
at_service = ArticleService()
