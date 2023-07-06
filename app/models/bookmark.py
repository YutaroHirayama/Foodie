from .db import db, environment, SCHEMA, add_prefix_for_prod

class Bookmark(db.Model):
    __tablename__ = 'bookmarks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}



    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('businesses.id'), ondelete='CASCADE'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    user = db.relationship('User', back_populates='bookmarks')
    business = db.relationship('Business', back_populates='bookmarks')


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'businessId': self.business_id,
            'createdAt': self.created_at,
            'user': self.user.to_dict_no_ref(),
            'business': self.business.to_dict(),
        }
