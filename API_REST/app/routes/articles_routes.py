from flask import Blueprint, request, jsonify
from app.services import db_service, tn_service, el_service , ur_service
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt()
from flask import redirect
articles_routes = Blueprint('articles_routes', __name__)

@articles_routes.route('/submit', methods=['POST'])
def receive_data():
    try:
        data = request.get_json()
        print('Données reçues du frontend :', data)
        return jsonify({'message': 'Données reçues avec succès'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
