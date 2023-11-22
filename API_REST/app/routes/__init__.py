from flask import Blueprint
from app.routes.auth_routes import login, register, verify_email, verify_token, send_verifyMail
from app.routes.user_routes import get_user, update_user_information, update_user_coordonnees, update_address

# Création des blueprints pour les routes d'authentification et utilisateur
auth_routes = Blueprint('auth_routes', __name__)
user_routes = Blueprint('user_routes', __name__)

# Ajout des routes aux blueprints
auth_routes.add_url_rule('/login', view_func=login, methods=['POST'])
auth_routes.add_url_rule('/register', view_func=register, methods=['POST'])
auth_routes.add_url_rule('/verify/<token>', view_func=verify_email, methods=['GET'])
auth_routes.add_url_rule('/verifyToken', view_func=verify_token, methods=['POST'])
auth_routes.add_url_rule('/send_verifyMail/<int:user_id>', view_func=send_verifyMail, methods=['POST'])


user_routes.add_url_rule('/user/<int:user_id>', view_func=get_user, methods=['GET'])
user_routes.add_url_rule('/user_information/<int:user_id>', view_func=update_user_information, methods=['PUT'])
user_routes.add_url_rule('/user_coordonnees/<int:user_id>', view_func=update_user_coordonnees, methods=['PUT'])
user_routes.add_url_rule('/address/<int:user_id>', view_func=update_address, methods=['PUT'])
