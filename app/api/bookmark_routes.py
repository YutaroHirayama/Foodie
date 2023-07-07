from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Review, Business, ReviewImage, User, db
from ..forms import ReviewForm
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime

bookmark_routes = Blueprint('bookmark', __name__)

# @bookmark_routes.route('/user')
# def get_bookmarks_current_user():
#     """
#     This route gets all the bookmarks of the current user.
#     """
#     bookmarks = Bookmark.query.filter(Bookmark.user_id == current_user.id).order_by(Bookmark.created_at.desc())
#     return [bookmark.to_dict() for bookmark in bookmarks]

@bookmark_routes.route('/<int:businessId>', methods=['POST'])
def add_bookmark(businessId):
    """
    This route adds a bookmark for the current user.
    """

    bookmark_to_add = Business.query.get(businessId)

    current_user.businesses_bookmarks.append(bookmark_to_add)

    db.session.commit()
    return bookmark_to_add.to_dict()

@bookmark_routes.route('/<int:businessId>', methods=['DELETE'])
def removeBookmark(businessId):
    """
    This route removes a bookmark of the current user.
    """

    # user = User.query.get(current_user.id)
    # print('USER----->',user)
    bookmark_to_remove = Business.query.get(businessId)

    current_user.businesses_bookmarks.remove(bookmark_to_remove)

    db.session.commit()
    return {'message': 'Successfully removed bookmark'}
