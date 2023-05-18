from .db import db, environment, SCHEMA, add_prefix_for_prod

class Business(db.Model):
    __tablename__ = 'businesses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False, unique=True)
    address = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    zipcode = db.Column(db.String(20), nullable=False)
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)
    price = db.Column(db.String, nullable=False)
    hours = db.Column(db.String)
    description = db.Column(db.String(1000))
    category = db.Column(db.String)
    website = db.Column(db.String)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    owner = db.relationship('User', back_populates='businesses_owned')
    reviews = db.relationship('Review', back_populates='business', order_by='Review.created_at', cascade='all, delete')
    businessImages = db.relationship('BusinessImage', back_populates='business')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'phoneNumber': self.phone_number,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'zipcode': self.zipcode,
            'lat': self.lat,
            'lng': self.lng,
            'price': self.price,
            'hours': self.hours,
            'description': self.description,
            'category': self.category,
            'website': self.website,
            'ownerId': self.owner_id,
            'owner': self.owner.to_dict_no_ref(),
            'reviews': [review.to_dict_with_user() for review in self.reviews]
        }

    def to_dict_no_ref(self):

        return {
            'id': self.id,
            'name': self.name,
            'phoneNumber': self.phone_number,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'zipcode': self.zipcode,
            'lat': self.lat,
            'lng': self.lng,
            'price': self.price,
            'hours': self.hours,
            'description': self.description,
            'category': self.category,
            'website': self.website,
            'ownerId': self.owner_id
        }
