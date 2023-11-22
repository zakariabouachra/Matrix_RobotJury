from flask import Blueprint
from app.routes.auth_routes import auth_routes
from app.routes.user_routes import user_routes
from app.routes.verify_routes import verify_routes

# Blueprint pour les routes d'authentification
auth_blueprint = Blueprint('auth', __name__)
auth_blueprint.register_blueprint(auth_routes)

# Blueprint pour les routes utilisateur
user_blueprint = Blueprint('user', __name__)
user_blueprint.register_blueprint(user_routes)

# Blueprint pour les routes verification
verify_blueprint = Blueprint('verify', __name__)
verify_blueprint.register_blueprint(verify_routes)
