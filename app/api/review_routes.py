from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Review, Business, ReviewImage, db
from ..forms import ReviewForm
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime
from ..api.aws_helpers import get_unique_filename, upload_file_to_s3

review_routes = Blueprint('review', __name__)

@review_routes.route('/user')
def get_reviews_current_user():
    """
    This route gets all the reviews of the current user.
    """
    reviews = Review.query.filter(Review.user_id == current_user.id).order_by(Review.created_at.desc())
    return [review.to_dict() for review in reviews]


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

        if form.data['image1']:

            image1 = form.data['image1']
            image1.filename = get_unique_filename(image1.filename)
            upload1 = upload_file_to_s3(image1)

            if "url" not in upload1:
                return upload1, 400

            reviewImage1 = ReviewImage(
                image_url = upload1['url']
                )
            newReview.reviewImages.append(reviewImage1)

        if form.data['image2']:

            image2 = form.data['image2']
            image2.filename = get_unique_filename(image2.filename)
            upload2 = upload_file_to_s3(image2)

            if "url" not in upload2:
                return upload2, 400

            reviewImage2 = ReviewImage(
                image_url = upload2['url']
                )
            newReview.reviewImages.append(reviewImage2)

        if form.data['image3']:

            image3 = form.data['image3']
            image3.filename = get_unique_filename(image3.filename)
            upload3 = upload_file_to_s3(image3)

            if "url" not in upload3:
                return upload3, 400

            reviewImage3 = ReviewImage(
                image_url = upload3['url']
                )
            newReview.reviewImages.append(reviewImage3)

        # if form.data['image1']:
        #     reviewImage1 = ReviewImage(
        #         image_url = form.data['image1']
        #     )
        #     newReview.reviewImages.append(reviewImage1)

        # if form.data['image2']:
        #     reviewImage2 = ReviewImage(
        #         image_url = form.data['image2']
        #     )
        #     newReview.reviewImages.append(reviewImage2)

        # if form.data['image3']:
        #     reviewImage3 = ReviewImage(
        #         image_url = form.data['image3']
        #     )
        #     newReview.reviewImages.append(reviewImage3)

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
        review_to_update.review = form.data['reviewText']
        review_to_update.rating = form.data['rating']

        if form.data['image1']:

            image1 = form.data['image1']
            image1.filename = get_unique_filename(image1.filename)
            upload1 = upload_file_to_s3(image1)

            if "url" not in upload1:
                return upload1, 400

            reviewImage1 = ReviewImage(
                image_url = upload1['url']
                )
            review_to_update.reviewImages.append(reviewImage1)

        if form.data['image2']:

            image2 = form.data['image2']
            image2.filename = get_unique_filename(image2.filename)
            upload2 = upload_file_to_s3(image2)

            if "url" not in upload2:
                return upload2, 400

            reviewImage2 = ReviewImage(
                image_url = upload2['url']
                )
            review_to_update.reviewImages.append(reviewImage2)

        if form.data['image3']:

            image3 = form.data['image3']
            image3.filename = get_unique_filename(image3.filename)
            upload3 = upload_file_to_s3(image3)

            if "url" not in upload3:
                return upload3, 400

            reviewImage3 = ReviewImage(
                image_url = upload3['url']
                )
            review_to_update.reviewImages.append(reviewImage3)

        # if form.data['image1']:
        #     if len(review_to_update.reviewImages) > 0:
        #         review_to_update.reviewImages[0].image_url = form.data['image1']
        #     else:
        #         reviewImage1 = ReviewImage(
        #             image_url = form.data['image1']
        #             )
        #         review_to_update.reviewImages.append(reviewImage1)

        # elif len(review_to_update.reviewImages) > 0:
        #     db.session.delete(review_to_update.reviewImages[0])

        # if form.data['image2']:
        #     if len(review_to_update.reviewImages) > 1:
        #         review_to_update.reviewImages[1].image_url = form.data['image2']
        #     else:
        #         reviewImage2 = ReviewImage(
        #             image_url = form.data['image2']
        #             )
        #         review_to_update.reviewImages.append(reviewImage2)

        # elif len(review_to_update.reviewImages) > 1:
        #     db.session.delete(review_to_update.reviewImages[1])

        # if form.data['image3']:
        #     if len(review_to_update.reviewImages) > 2:
        #         review_to_update.reviewImages[2].image_url = form.data['image3']
        #     else:
        #         reviewImage3 = ReviewImage(
        #             image_url = form.data['image3']
        #             )
        #         review_to_update.reviewImages.append(reviewImage3)

        # elif len(review_to_update.reviewImages) > 2:
        #     db.session.delete(review_to_update.reviewImages[2])

        db.session.commit()
        return review_to_update.to_dict()

    # or 422
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@review_routes.route('/<int:reviewId>', methods=['DELETE'])
def delete_review(reviewId):
    """
    This route deletes a review of the logged in user.
    """

    review_to_delete = Review.query.get(reviewId)

    if current_user.id != review_to_delete.user_id:
        return {'errors': ['Forbidden']}, 403

    db.session.delete(review_to_delete)
    db.session.commit()

    return {'message': 'Successfully deleted review.'}
