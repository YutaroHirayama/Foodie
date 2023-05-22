from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Review, Business, db
from ..forms import ReviewForm
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime

review_routes = Blueprint('review', __name__)

# @review_routes.route('/business/<int:businessId>')
# def get_reviews_by_business_id(businessId):
#     """
#     This route gets all the reviews for the business
#     """

#     business = Business.query.get(businessId)
#     return


@review_routes.route('/business/<int:businessId>', methods=['POST'])
def create_review(businessId):
    """
    This route creates a new review for the logged-in user
    """

    business = Business.query.get(businessId)

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newReview = Review(
            user = current_user,
            business = business,
            review = form.data['reviewText'],
            rating = form.data['rating'],
            created_at = datetime.now()
        )

        db.session.add(newReview)
        db.session.commit()
        return newReview.to_dict()

    # or 422
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@review_routes.route('/<int:reviewId>', methods=['PUT'])
def update_review(reviewId):
    """
    This route updates an existing review of the logged-in user
    """

    review_to_update = Review.query.get(reviewId)

    if current_user.id != review_to_update.user_id:
        return {'errors': ['Forbidden']}, 403

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review_to_update.review = form.data['review']
        review_to_update.rating = form.data['rating']

        db.session.commit()
        return review_to_update.to_dict()

    # or 422
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@review_routes.route('/<int:reviewId>')
def delete_review(reviewId):
    """
    This route deletes a review of the logged in user.
    """

    review_to_delete = Review.query.get(reviewId)

    if current_user.id != review_to_delete.user_id:
        return {'errors': ['Forbidden']}, 403

    db.session.delete(review_to_delete)
    db.session.commit()

    return review_to_delete.to_dict()
