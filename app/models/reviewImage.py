from .db import db, environment, SCHEMA, add_prefix_for_prod

class ReviewImage(db.Model):
    __tablename__ = 'reviewImages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('reviews.id'), ondelete='CASCADE'), nullable=False)
    image_url = db.Column(db.String, nullable=False)

    review = db.relationship('Review', back_populates='reviewImages')

    def to_dict(self):
        return {
            'id': self.id,
            'ReviewId': self.review_id,
            'imageUrl': self.image_url
        }
