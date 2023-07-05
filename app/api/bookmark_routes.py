from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Review, Business, ReviewImage, Bookmark, db
from ..forms import ReviewForm
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime

bookmark_routes = Blueprint('bookmark', __name__)

@bookmark_routes.route('/user')
def get_bookmarks_current_user():
    """
    This route gets all the bookmarks of the current user.
    """
    bookmarks = Bookmark.query.filter(Bookmark.user_id == current_user.id).order_by(Bookmark.created_at.desc())
    return [bookmark.to_dict() for bookmark in bookmarks]
