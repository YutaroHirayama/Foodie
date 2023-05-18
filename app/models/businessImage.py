from .db import db, environment, SCHEMA, add_prefix_for_prod

class BusinessImage(db.Model):
    __tablename__ = 'businessImages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('businesses.id'), ondelete='CASCADE'), nullable=False)
    image_url = db.Column(db.String, nullable=False)
    main_image = db.Column(db.Boolean)
    description = db.Column(db.String(200))

    business = db.relationship('Business', back_populates='businessImages')

    def to_dict(self):
        return {
            'id': self.id,
            'businessId': self.business_id,
            'imageUrl': self.image_url,
            'mainImage': self.main_image,
            'description': self.description
        }
