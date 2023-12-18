from flask import Blueprint
from app.routes.auth_routes import login, register
from app.routes.user_routes import get_user, update_user_information, update_user_coordonnees, update_address
from app.routes.articles_routes import receive_data , get_articles, update_payment_status , get_article_data, update_article_data , predict_status , supprimer_article
from app.routes.verify_routes import verify_email, verify_token, send_verifyMail , send_verifyPhone, verify_phone

auth_routes = Blueprint('auth_routes', __name__)
user_routes = Blueprint('user_routes', __name__)
verify_routes = Blueprint('verify_routes', __name__)
articles_routes = Blueprint('articles_routes', __name__)


# Ajout des routes aux blueprints
auth_routes.add_url_rule('/login', view_func=login, methods=['POST'])
auth_routes.add_url_rule('/register', view_func=register, methods=['POST'])


verify_routes.add_url_rule('/verify/<token>', view_func=verify_email, methods=['GET'])
verify_routes.add_url_rule('/verifyToken', view_func=verify_token, methods=['POST'])
verify_routes.add_url_rule('/send_verifyMail/<int:user_id>', view_func=send_verifyMail, methods=['POST'])
verify_routes.add_url_rule('/send_verifyPhone/<int:user_id>', view_func=send_verifyPhone, methods=['POST'])
verify_routes.add_url_rule('/verify_phone/<int:user_id>', view_func=verify_phone, methods=['POST'])


user_routes.add_url_rule('/user/<int:user_id>', view_func=get_user, methods=['GET'])
user_routes.add_url_rule('/user_information/<int:user_id>', view_func=update_user_information, methods=['PUT'])
user_routes.add_url_rule('/user_coordonnees/<int:user_id>', view_func=update_user_coordonnees, methods=['PUT'])
user_routes.add_url_rule('/address/<int:user_id>', view_func=update_address, methods=['PUT'])


articles_routes.add_url_rule('/article_information',view_func=receive_data, methods=['POST'])
articles_routes.add_url_rule('/articles',view_func=get_articles, methods=['GET'])
articles_routes.add_url_rule('/update-payment-status/<string:orderID>',view_func=update_payment_status, methods=['POST'])
articles_routes.add_url_rule('/get_article_data/<int:article_id>',view_func=get_article_data, methods=['GET'])
articles_routes.add_url_rule('/update_article_data/<article_id>',view_func=update_article_data, methods=['POST'])
articles_routes.add_url_rule('/predict_status/<article_id>',view_func=predict_status, methods=['POST'])
articles_routes.add_url_rule('/supprimerarticle/<int:article_id>',view_func=supprimer_article, methods=['DELETE'])
