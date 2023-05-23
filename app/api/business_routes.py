from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Business, BusinessImage, db
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

@business_routes.route('/user')
def get_businesses_current_user():
    """
    This route gets businesses that are owned by the current user.
    """

    businessesOwned = Business.query.filter(Business.owner_id == current_user.id).order_by(Business.name)
    return [business.to_dict_no_owner() for business in businessesOwned]

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

        if form.data['image1']:
            businessImage1 = BusinessImage(
                image_url = form.data['image1']
                )
            newBusiness.businessImages.append(businessImage1)

        if form.data['image2']:
            businessImage2 = BusinessImage(
                image_url = form.data['image2']
                )
            newBusiness.businessImages.append(businessImage2)

        if form.data['image3']:
            businessImage3 = BusinessImage(
                image_url = form.data['image3']
                )
            newBusiness.businessImages.append(businessImage3)

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

        if form.data['image1']:
            if len(business_to_update.businessImages) > 0:
                business_to_update.businessImages[0].image_url = form.data['image1']
            else:
                businessImage1 = BusinessImage(
                    image_url = form.data['image1']
                    )
                business_to_update.businessImages.append(businessImage1)

        elif len(business_to_update.businessImages) > 0:
                db.session.delete(business_to_update.businessImages[0])

        if form.data['image2']:
            if len(business_to_update.businessImages) > 1:
                business_to_update.businessImages[1].image_url = form.data['image2']
            else:
                businessImage2 = BusinessImage(
                    image_url = form.data['image2']
                    )
                business_to_update.businessImages.append(businessImage2)

        elif len(business_to_update.businessImages) > 1:
            db.session.delete(business_to_update.businessImages[1])

        if form.data['image3']:
            if(len(business_to_update.businessImages) > 2):
                business_to_update.businessImages[2].image_url = form.data['image3']
            else:
                businessImage3 = BusinessImage(
                    image_url = form.data['image3']
                    )
                business_to_update.businessImages.append(businessImage3)

        elif len(business_to_update.businessImages) > 2:
            db.session.delete(business_to_update.businessImages[2])

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

    return {'message': 'Successfully deleted business page.'}
