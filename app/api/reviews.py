from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Business, db
from ..forms import BusinessForm
from .auth_routes import validation_errors_to_error_messages

reviews_routes = Blueprint('reviews', __name__)

@reviews_routes.route('/business/<int:businessId>')
def get_reviews_by_business_id(businessId):
    """
    This route gets all the reviews for the business
    """

    business = Business.query.get(businessId)
