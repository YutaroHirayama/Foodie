from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Restaurant

restaurant_routes = Blueprint('restaurants', __name__)

@restaurant_routes.route('')
def get_all_restaurants():
    """
    This route gets all the restaurants that are in the db
    """

    restaurants = Restaurant.query.all()
    return [restaurant.to_dict for restaurant in restaurants]

@restaurant_routes.route('/<int:id>')
def get_one_restaurant(id):
    """
    This route gets one restaurant by restaurant_id
    """

    restaurant = Restaurant.query.get(id)
    if restaurant:
        return restaurant.to_dict()
    return {'errors': ["Not Found"]}, 404
