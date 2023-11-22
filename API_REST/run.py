from flask import Flask
from flask_cors import CORS
<<<<<<< HEAD
from app.routes import auth_routes, user_routes,articles_routes
=======
from app.routes import auth_routes, user_routes, verify_routes
>>>>>>> ccc49c2854153857cbdb5cef320e4ff30bab04de

app = Flask(__name__)

# Enregistrement des blueprints
app.register_blueprint(auth_routes)
app.register_blueprint(user_routes)
<<<<<<< HEAD
app.register_blueprint(articles_routes)



=======
app.register_blueprint(verify_routes)
>>>>>>> ccc49c2854153857cbdb5cef320e4ff30bab04de

# Activation de CORS pour l'application
CORS(app)

if __name__ == "__main__":
    app.run(debug=True)  # Pour exécuter l'application en mode debug
