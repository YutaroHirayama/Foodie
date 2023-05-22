from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Business, db
from ..forms import BusinessForm
from .auth_routes import validation_errors_to_error_messages

business_routes = Blueprint('business', __name__)

@business_routes.route('')
def get_all_businesses():
    """
    This route gets all the businesses that are in the db
    """

    businesses = Business.query.all()
    return [business.to_dict() for business in businesses]

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
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newBusiness = Business(
            name = form.data['name'],
            phone_number = form.data['phoneNumber'],
            address = form.data['address'],
            city = form.data['city'],
            state = form.data['state'],
            zipcode = form.data['zipcode'],
            lat = form.data['lat'],
            lng = form.data['lng'],
            price = form.data['price'],
            hours = form.data['hours'],
            description = form.data['description'],
            category = form.data['category'],
            website = form.data['website'],
            owner=current_user
        )

        db.session.add(newBusiness)
        db.session.commit()
        return newBusiness.to_dict()

    # or 422
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@business_routes.route('/<int:businessId>', methods=['PUT'])
@login_required
def update_business(businessId):
    """
    This route updates the business details if the user is the owner
    """

    business_to_update = Business.query.get(businessId)

    if current_user.id != business_to_update.owner_id:
        return {'errors': ['Forbidden']}, 403

    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        business_to_update.name = form.data['name']
        business_to_update.phone_number = form.data['phoneNumber']
        business_to_update.address = form.data['address']
        business_to_update.city = form.data['city']
        business_to_update.state = form.data['state']
        business_to_update.zipcode = form.data['zipcode']
        business_to_update.lat = form.data['lat']
        business_to_update.lng = form.data['lng']
        business_to_update.price = form.data['price']
        business_to_update.hours = form.data['hours']
        business_to_update.description = form.data['description']
        business_to_update.category = form.data['category']
        business_to_update.website = form.data['website']

        db.session.commit()
        return business_to_update.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@business_routes.route('/<int:businessId>', methods=['DELETE'])
@login_required
def delete_business(businessId):
    """
    This route deletes a business of the logged in user.
    """

    business_to_delete = Business.query.get(businessId)

    if current_user.id != business_to_delete.owner_id:
        return {'errors': ['Forbidden']}, 403

    db.session.delete(business_to_delete)
    db.session.commit()

    return business_to_delete.to_dict()
