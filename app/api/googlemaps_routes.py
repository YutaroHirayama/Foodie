from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
import os

mapkey_routes = Blueprint('mapkey', __name__)

@mapkey_routes.route('/key', methods=['POST'])
def mapkey():
    key = os.environ.get('MAPS_API_KEY')

    return {'mapsAPIKey': key}
