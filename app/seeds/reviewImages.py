from app.models import db, ReviewImage, environment, SCHEMA
from sqlalchemy.sql import text


review1_1 = ReviewImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/dxxrXyZMs7dl2JLNgj6tTQ/o.jpg',
  )
review1_2 = ReviewImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/Rmf21kDrjjR7kn0-NLWenA/o.jpg',
  )
review1_3 = ReviewImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/Yge-XaZ4E-Q3SAXKaWr4nQ/o.jpg',
  )
review2_1 = ReviewImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/PdLjfn3UagrkVCu1TYahLA/o.jpg',
  )
review5_1 = ReviewImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/HHU2NHVJ_1e3gkm0O6G7ew/o.jpg'
)
review5_2 = ReviewImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/9WvihJ1ll2Jr90QafZs9tA/o.jpg'
)
review9_1 = ReviewImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/CjKxAA6GZFThS_FGY6hrAA/o.jpg'
)

def undo_reviewImages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviewImages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviewImages"))

    db.session.commit()
