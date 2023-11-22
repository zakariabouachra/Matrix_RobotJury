from flask import Flask
from flask_cors import CORS
from app.routes import auth_routes, user_routes, verify_routes

app = Flask(__name__)

# Enregistrement des blueprints
app.register_blueprint(auth_routes)
app.register_blueprint(user_routes)
app.register_blueprint(verify_routes)

# Activation de CORS pour l'application
CORS(app)

if __name__ == "__main__":
    app.run(debug=True)  # Pour exécuter l'application en mode debug
