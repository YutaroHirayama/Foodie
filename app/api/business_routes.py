from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Business, BusinessImage, db
from sqlalchemy import or_
from ..forms import BusinessForm
from .auth_routes import validation_errors_to_error_messages
from ..api.aws_helpers import get_unique_filename, upload_file_to_s3

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
            description = form.data['description'],
            category = form.data['category'],
            website = form.data['website'],
            owner=current_user
        )

        if form.data['image1']:

            image1 = form.data['image1']
            image1.filename = get_unique_filename(image1.filename)
            upload1 = upload_file_to_s3(image1)

            if "url" not in upload1:
                return upload1, 400

            businessImage1 = BusinessImage(
                image_url = upload1['url']
                )
            newBusiness.businessImages.append(businessImage1)

        if form.data['image2']:

            image2 = form.data['image2']
            image2.filename = get_unique_filename(image2.filename)
            upload2 = upload_file_to_s3(image2)

            if "url" not in upload2:
                return upload2, 400

            businessImage2 = BusinessImage(
                image_url = upload2['url']
                )
            newBusiness.businessImages.append(businessImage2)

        if form.data['image3']:

            image3 = form.data['image3']
            image3.filename = get_unique_filename(image3.filename)
            upload3 = upload_file_to_s3(image3)

            if "url" not in upload3:
                return upload3, 400

            businessImage3 = BusinessImage(
                image_url = upload3['url']
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
        business_to_update.description = form.data['description']
        business_to_update.category = form.data['category']
        business_to_update.website = form.data['website']

        if form.data['image1']:

            image1 = form.data['image1']
            image1.filename = get_unique_filename(image1.filename)
            upload1 = upload_file_to_s3(image1)

            if "url" not in upload1:
                return upload1, 400

            businessImage1 = BusinessImage(
                image_url = upload1['url']
                )
            business_to_update.businessImages.append(businessImage1)

        # if form.data['image1']:

        #     if len(business_to_update.businessImages) > 0:
        #         business_to_update.businessImages[0].image_url = form.data['image1']
        #     else:
        #         businessImage1 = BusinessImage(
        #             image_url = form.data['image1']
        #             )
        #         business_to_update.businessImages.append(businessImage1)

        # elif len(business_to_update.businessImages) > 0:
        #         db.session.delete(business_to_update.businessImages[0])

        # if form.data['image2']:
        #     if len(business_to_update.businessImages) > 1:
        #         business_to_update.businessImages[1].image_url = form.data['image2']
        #     else:
        #         businessImage2 = BusinessImage(
        #             image_url = form.data['image2']
        #             )
        #         business_to_update.businessImages.append(businessImage2)

        # elif len(business_to_update.businessImages) > 1:
        #     db.session.delete(business_to_update.businessImages[1])

        # if form.data['image3']:
        #     if(len(business_to_update.businessImages) > 2):
        #         business_to_update.businessImages[2].image_url = form.data['image3']
        #     else:
        #         businessImage3 = BusinessImage(
        #             image_url = form.data['image3']
        #             )
        #         business_to_update.businessImages.append(businessImage3)

        # elif len(business_to_update.businessImages) > 2:
        #     db.session.delete(business_to_update.businessImages[2])

        db.session.commit()
        return business_to_update.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@business_routes.route('/<int:businessId>/<image>', methods=['DELETE'])
@login_required
def delete_business_image(businessId, image):
    """
    This route deletes a business Image.
    """
    business_of_image = Business.query.get(businessId)
    image_to_delete = BusinessImage.query.filter(image == Business.image_url)

    if current_user.id != business_of_image.owner_id:
        return {'errors': ['Forbidden']}, 403

    db.session.delete(image_to_delete)

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


@business_routes.route('/search/<keywords>')
def search_businesses(keywords):
    """
    This route searches businesses by keyword
    """

    businesses = Business.query.filter(or_(Business.name.ilike(f'%{keywords}%'), Business.category.ilike(f'%{keywords}%')))
    return [business.to_dict() for business in businesses]
