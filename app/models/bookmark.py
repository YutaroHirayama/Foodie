from .db import db, environment, SCHEMA, add_prefix_for_prod

bookmarks = db.Table(
    "bookmarks",
    db.Model.metadata,
    db.Column("users", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete='CASCADE'), primary_key=True),
    db.Column("businesses", db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id"), ondelete='CASCADE'), primary_key=True)
)

if environment == "production":
    bookmarks.schema = SCHEMA
