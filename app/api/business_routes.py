from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Business
from ..forms import BusinessForm

business_routes = Blueprint('businesses', __name__)

@business_routes.route('')
def get_all_businesses():
    """
    This route gets all the businesses that are in the db
    """

    businesses = Business.query.all()
    return [business.to_dict for business in businesses]

@business_routes.route('/<int:id>')
def get_one_business(id):
    """
    This route gets one business by business_id
    """

    business = Business.query.get(id)
    if business:
        return business.to_dict()
    return {'errors': ["Not Found"]}, 404

@business_routes.route('', methods=['POST'])
@login_required
def create_business():
    """
    This route creates a business for the logged-in user
    """

    form = BusinessForm()
