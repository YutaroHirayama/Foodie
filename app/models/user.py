from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .bookmark import bookmarks

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_pic = db.Column(db.String(1000), default='https://img.favpng.com/1/15/9/scalable-vector-graphics-computer-icons-user-profile-portable-network-graphics-png-favpng-n05BjRqcBz9Ub9NtAbz8GXEaN.jpg')

    businesses_owned = db.relationship('Business', back_populates='owner')
    reviews = db.relationship('Review', back_populates='user', order_by='Review.created_at.desc()')

    businesses_bookmarks = db.relationship(
        "Business",
        secondary=bookmarks,
        back_populates="users_bookmarks",
        passive_deletes=True
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'email': self.email,
            'profilePic': self.profile_pic,
            'businessesOwned': [business.to_dict() for business in self.businesses_owned],
            'reviews': [review.to_dict_no_ref() for review in self.reviews],
            'bookmarks': [business.to_dict() for business in self.businesses_bookmarks]
        }

    def to_dict_no_ref(self):
        return {
            'id': self.id,
            'username': self.username,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'email': self.email,
            'profilePic': self.profile_pic
        }
