from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_reviews():
    pizza1r1 = Review(
        user_id=3,
        business_id=1,
        review="UNREAL. We came in as a group last night after our work conference. There was a group of 10 of us, and they accommodated us no questions asked. The staff were all very friendly. But the STAR of the show was the pizza of course. Our server gave us his top recs and we ordered a handful of pies. The clam and mushroom pizzas were my favorite. The crust is insane. The server let us know it's a three day labor of love. You could taste salt flakes in the crust. I'm drooling again...",
        rating=5,
        created_at=datetime.now()
    )
    pizza1r2 = Review(
        user_id=4,
        business_id=1,
        review="The pizzas are good but for the price, very small. The best idea is to come here at HH where you can get all pizzas 1/2 off and discounted apps. There's usually a good seasonal salad available on happy hour which is nice.",
        rating=4,
        created_at=datetime.now()
    )
    pizza2r1 = Review(
        user_id=5,
        business_id=2,
        review="I recently visited Rocco's and it was an absolute delight! We came here on a recommendation from our Airbnb host, and I'm so glad we did. The food and service were both top-notch. We ordered a whole pizza with custom toppings - half Hawaiian and half a meat style topping, along with an order of meatballs. Everything was absolutely delicious, but the star of the show was definitely their house made ranch dressing! It was creamy, tangy, and perfectly seasoned. The pizza itself was fantastic as well. It comes with 8 generous slices, which was more than enough for the three of us. In fact, we even had 4 slices left over to take home and share later. I have to say, this was one of the best types of pizza I've ever had. The crust was crispy and flavorful, and the toppings were fresh and plentiful. Overall, I would highly recommend Rocco's to anyone looking for delicious pizza and great service. The house made ranch dressing is a must-try, honestly best pizza I've ever had. A tad controversial but I'd say better than pizza in New York",
        rating=5,
        created_at=datetime.now()
    )
    pizza2r2 = Review(
        user_id=6,
        business_id=2,
        review="I love coming to Rocco's. They have great food, especially the best pizza in town. It's my go to pizza spot. The only reason it's 4 stars for me is there is a bouncer that checks your ID. It seems a little intense to have someone at a restaurant checking you in, then escorting you in.  It doesn't say anywhere that it's 21 years and older to enter. So unsure of this tactic. To me, this appearance doesn't feel like VIP service, it feels intimidating just to get some food. I'll always come back though.",
        rating=4,
        created_at=datetime.now()
    )
    burger1r1 = Review(
        user_id=6,
        business_id=3,
        review="My favorite burger place of all time! The juiciest burger I've ever had plus my favorite cheese- Beecher's! and arugula. A do not miss place to try in Capitol Hill! Plus I highly recommend their garlic fries which are some of the best I've had. The prices are a bit high but not far off from other places in the neighborhood and they're worth it!",
        rating=5,
        created_at=datetime.now()
    )
    burger1r2 = Review(
        user_id=5,
        business_id=3,
        review="If I could give 6 stars I would. 8 oz has such a great atmosphere, it feels like going back in time. I really liked the music and the lighting as well, it all came together really nicely. But more importantly, the food was amazing. I think this may have been the best burger I've ever had. The best part is that you can also customize your burger to your liking. Don't get me started on the flavors of the milkshakes and the fries. And the service was not only so quick but our server had amazing recommendations when I asked her questions while building my burger. Very great restaurant, one of Seattle's best for sure.",
        rating=5,
        created_at=datetime.now()
    )
    burger2r1 = Review(
        user_id=4,
        business_id=3,
        review="I recently visited Uneedaburger and had an amazing experience. The staff was incredibly friendly and polite, making me feel welcome from the moment I walked in the door. The ambience of the restaurant is laid back and relaxed, creating a comfortable atmosphere to enjoy a meal and a drink. Speaking of the meal, the burgers were exceptional! They had a great selection of burgers that are all made with fresh ingredients, and I love how you can customize them to your liking. The quality of the ingredients really shines through in the taste of the burgers. To top it off, They had a decent selection of beers that perfectly complement the burgers. I would highly recommend checking out this restaurant if you're in the area and looking for a delicious and fresh meal. You won't be disappointed!",
        rating=5,
        created_at=datetime.now()
    )
    burger2r2 = Review(
        user_id=3,
        business_id=3,
        review="Tried Uneeda Burger for the first time after hearing so much hype about it. The service was good but we were disappointed with the food. Both burgers were so greasy that we unfortunately could not finish eating them. We also got the sweet potato fries which were okay and the onion rings which were hard and unseasoned",
        rating=2,
        created_at=datetime.now()
    )


    all_reviews = [pizza1r1, pizza1r2, pizza2r1, pizza2r2, burger1r1, burger1r2, burger2r1, burger2r2]
    add_reviews = [db.session.add(review) for review in all_reviews]
    db.session.commit()
    print('all reviews added')


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
