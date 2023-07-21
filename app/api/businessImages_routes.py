from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Business, BusinessImage, db
from sqlalchemy import or_
from ..forms import BusinessForm
from .auth_routes import validation_errors_to_error_messages
from ..api.aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

businessImage_routes = Blueprint('businessImage', __name__)

@businessImage_routes.route('/<int:imageId>', methods=['DELETE'])
@login_required
def delete_business_image(imageId):
    """
    This route deletes a business Image.
    """

    image_to_delete = BusinessImage.query.get(imageId)
    business_of_image = Business.query.get(image_to_delete.business_id)

    if current_user.id != business_of_image.owner_id:
        return {'errors': ['Forbidden']}, 403
    else:
        remove_file_from_s3(image_to_delete.image_url)
        db.session.delete(image_to_delete)
        db.session.commit()

    return {'message': 'Successfully deleted business image.'}
