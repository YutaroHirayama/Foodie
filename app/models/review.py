from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('businesses.id'), ondelete='CASCADE'), nullable=False)
    review = db.Column(db.String(2000), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    user = db.relationship('User', back_populates='reviews')
    business = db.relationship('Business', back_populates='reviews')
    reviewImages = db.relationship('ReviewImage', back_populates='review', cascade='delete, all')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'businessId': self.business_id,
            'review': self.review,
            'rating': self.rating,
            'createdAt': self.created_at,
            'user': self.user.to_dict_no_ref(),
            'business': self.business.to_dict_no_ref(),
            'reviewImages': [image.image_url for image in self.reviewImages]
        }

    def to_dict_no_ref(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'businessId': self.business_id,
            'review': self.review,
            'rating': self.rating,
            'createdAt': self.created_at
        }

    def to_dict_with_user(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'businessId': self.business_id,
            'review': self.review,
            'rating': self.rating,
            'createdAt': self.created_at,
            'user': self.user.to_dict_no_ref()
    }
