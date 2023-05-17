from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('restaurants.id'), ondelete='CASCADE'), nullable=False)
    review = db.Column(db.String(1000))
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    user = db.relationship('User', back_populates='reviews')
    restaurant = db.relationship('Restaurant', back_populates='reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'restauranId': self.restaurant_id,
            'review': self.review,
            'rating': self.rating,
            'created_at': self.created_at,
            'user': self.user.to_dict_no_ref(),
            'restaurant': self.restaurant.to_dict_no_ref()
        }

    def to_dict_no_ref(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'restauranId': self.restaurant_id,
            'review': self.review,
            'rating': self.rating,
            'created_at': self.created_at
        }
