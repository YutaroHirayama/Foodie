from app.models import db, BusinessImage, environment, SCHEMA
from sqlalchemy.sql import text


pizza1_1 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/Yge-XaZ4E-Q3SAXKaWr4nQ/o.jpg'
  )
pizza1_2 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/U1yEGpwXmVa2gHLOS9rEeQ/o.jpg'
  )
pizza1_3 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/ePiYmNCXh0CiAUGwJJZl1g/o.jpg'
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

boba1_1 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/uxsrWjNLEFn_kPLRXBnFYA/o.jpg'
)

boba1_2 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/Y4_GCoKZeW4M0B8f139Ygw/o.jpg'
)

boba2_1 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/NeLDxcp9mIdGozl53JuEow/o.jpg'
)

boba2_2 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/ubCKhAYRfX_WUTH9STXZTQ/o.jpg'
)

kbbq1_1 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/SKjqbeJkC6dVEK0lElgiMA/o.jpg'
)

kbbq1_2 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/yhpsQYf_eq7QN5-2JVZBjw/o.jpg'
)

kbbq1_3 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/IqKLrLxccCdy81CZnxJzlw/o.jpg'
)

kbbq2_1 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/Dov6mCkJSk1pFUXjj7e-jQ/o.jpg'
)

kbbq2_2 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/QFWJNdBykqNQ5R0xOFLx9A/o.jpg'
)

kbbq2_3 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/VAASuMPsc7goCfeLu9PrKA/o.jpg'
)

sandwich1_1 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/-7BjwyFcao4akURGnVPNDA/o.jpg'
)

sandwich1_2 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/be6kG81vh7fr8OLQX3bRTQ/o.jpg'
)

sandwich1_3 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/6YUiGbQJTjBSGGbpVY8I2Q/o.jpg'
)

sandwich2_1 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/gEDAd15V8vfCq9BrmKl7rg/o.jpg'
)

sandwich2_2 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/TkoSnO3nLaKFmWgRuNRD9w/o.jpg'
)

sandwich2_3 = BusinessImage(
    image_url='https://s3-media0.fl.yelpcdn.com/bphoto/hyu4ynv2sGEd0uT5uw5wlw/o.jpg'
)

def undo_businessImages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businessImages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM businessImages"))

    db.session.commit()
