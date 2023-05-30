from app.models import db, BusinessImage, environment, SCHEMA
from sqlalchemy.sql import text


pizza1_1 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/Yge-XaZ4E-Q3SAXKaWr4nQ/o.jpg'
  )
pizza2_1 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/7h9z8mCAbDunqqct_xIYPA/o.jpg'
  )
burger1_1 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/aIK4AYxb0z71ZBwa-5Llrg/o.jpg'
  )
burger2_1 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/996fetM63qjy8Ec7flDOzA/o.jpg'
  )
sushi1_1 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/hcw9EaRZBjhdn8P3Vn5HMA/o.jpg'
)
sushi1_2 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/Gs9xeFtJfeXQsZHhSCvB5A/o.jpg'
)
sushi1_3 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/r_KkYcV8J99ZDWMqgj4WSg/o.jpg'
)
sushi2_1 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/kQcxw_6b0eObdPowW9Fb0A/o.jpg'
)
sushi2_2 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/vwlHAJl4dlpCb4_BZpur5Q/o.jpg'
)
sushi2_3 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/Qdwctn_IzlvmiAsD6-pVbw/o.jpg'
)
taco1_1 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/u8fh4LtcWlSSi4rTnz9WYA/o.jpg'
)
taco1_2 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/6rODeVGRQe0sATisVSCUwQ/o.jpg'
)
taco2_1 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/okRii6wyxtxRYMYBcSfquw/o.jpg'
)
ramen1_1 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/VuXd6Cny4jHjYga5hiau0g/o.jpg'
)
ramen1_2 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/oOVjF1JSV8U9u5fNXa8sew/o.jpg'
)
ramen1_3 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/3I_sDbr9pYkRql9jT0-6sQ/o.jpg'
)
def undo_businessImages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businessImages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM businessImages"))

    db.session.commit()
