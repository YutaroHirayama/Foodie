from app.models import db, BusinessImage, environment, SCHEMA
from sqlalchemy.sql import text


pizza1_1 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/Yge-XaZ4E-Q3SAXKaWr4nQ/o.jpg',
    main_image=True
  )
pizza2_1 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/7h9z8mCAbDunqqct_xIYPA/o.jpg',
    main_image=True
  )
burger1_1 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/aIK4AYxb0z71ZBwa-5Llrg/o.jpg',
    main_image=True
  )
burger2_1 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/996fetM63qjy8Ec7flDOzA/o.jpg',
    main_image=True
  )

def undo_businessImages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businessImages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM businessImages"))

    db.session.commit()
