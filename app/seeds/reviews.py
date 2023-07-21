from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
from .reviewImages import review1_1, review1_2, review1_3, review2_1, review5_1, review5_2, review9_1

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
    pizza1r3 = Review(
        user_id=5,
        business_id=1,
        review='Super delicious and great service.',
        rating=5,
        created_at=datetime.now()
    )
    pizza1r4 = Review(
        user_id=6,
        business_id=1,
        review='This place has the best pizza in town!',
        rating=5,
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
    pizza2r3 = Review(
        user_id=4,
        business_id=2,
        review='My second favorite pizza spot in town.',
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
        business_id=4,
        review="I recently visited Uneedaburger and had an amazing experience. The staff was incredibly friendly and polite, making me feel welcome from the moment I walked in the door. The ambience of the restaurant is laid back and relaxed, creating a comfortable atmosphere to enjoy a meal and a drink. Speaking of the meal, the burgers were exceptional! They had a great selection of burgers that are all made with fresh ingredients, and I love how you can customize them to your liking. The quality of the ingredients really shines through in the taste of the burgers. To top it off, They had a decent selection of beers that perfectly complement the burgers. I would highly recommend checking out this restaurant if you're in the area and looking for a delicious and fresh meal. You won't be disappointed!",
        rating=5,
        created_at=datetime.now()
    )
    burger2r2 = Review(
        user_id=3,
        business_id=4,
        review="Tried Uneeda Burger for the first time after hearing so much hype about it. The service was good but we were disappointed with the food. Both burgers were so greasy that we unfortunately could not finish eating them. We also got the sweet potato fries which were okay and the onion rings which were hard and unseasoned",
        rating=2,
        created_at=datetime.now()
    )
    sushi1r1 = Review(
        user_id=3,
        business_id=5,
        review="This is your sign to go... Shiro's is so so so good and their service ... amazing!!! Prior to my visit, my partner went online to do reservations. We came in around 5:30 and had a reservation for 6 PM, but luckily there were seats available! The restaurant can either be pretty casual or you can dress up! We were seated in the back room, in the corner of the restaurant & I was honestly worried that we wouldn't really be noticed... but the service was so great and accommodating! The hostess noticed that I was left handed and asked the chefs to plate my dish Left to Right rather than the traditional way (Right to Left). The fish is so fresh and the flavors are so simple but delicious. The presentation of each course was put together so nicely as well! My favorites were the pieces with Yuzu and Salt, and definitely the blue fin tuna pieces (3rd course). This is definitely a restaurant somewhere I would recommend another person to visit if they are visiting Seattle.",
        rating=5,
        created_at=datetime.now()
    )
    sushi1r2 = Review(
        user_id=4,
        business_id=5,
        review="Shiro's was delicious - each of us got the 19-piece omakase where we sat at the table. We also ordered the Black Cod Karaage and both Hojicha desserts and were impressed with how amazing they were. Some of the cuts weren't the best but we're getting a discount at the table rather than the chef's bar. I'd come back for sure when visiting Seattle!",
        rating=5,
        created_at=datetime.now()
    )
    taco1r1 = Review(
        user_id=3,
        business_id=7,
        review="One of the trendiest taco spots within Seattle, I feel like if you haven't heard of this place you probably don't go out for tacos a whole lot. Tacos Chukis is located on Broadway Capitol Hill inside a little building with a couple of shops in it. You'll have to go upstairs into the very back area. Everytime I come in I always order their house special Tacos Chukis, which is basically their regular taco with a chunk of pineapple added. Sounds a little strange but oddly enough it works! They're pretty good tacos and fairly priced for inner-city taco spots. Would give them a solid 4.5/5 rating",
        rating=5,
        created_at=datetime.now()
    )
    taco1r2 = Review(
        user_id=4,
        business_id=7,
        review="We arrived with a line outside the door as people were ordering online via their phone. We went inside and used the iPad to place our order. 15 min later someone was taking orders.",
        rating=5,
        created_at=datetime.now()
    )
    ramen1r1 = Review(
        user_id=6,
        business_id=9,
        review="This is my first review ever. I've been going to Ramen Danbo for 3/4 years and it's always good, I love the consistency. Probably the best ramen in Seattle. So grateful I have this place! I always get the Spicy Miso Rekka Ramen. It's always perfect as well as the toppings. (Yum yum Kikurage!) Thank you to the chefs and staff! Appreciate you guys.",
        rating=5,
        created_at=datetime.now()
    )
    boba1r1 = Review(
        user_id=6,
        business_id=10,
        review="Great tasting tea in Chinatown right by the train station and fast service! They have many options and I'm not sure you can go wrong, however I recommend the lychee oolong tea. Sweet, but not too sweet.",
        rating=5,
        created_at=datetime.now()
    )
    boba1r2 = Review(
        user_id=5,
        business_id=10,
        review="It's located right next to the Chinatown entrance. There is usually a line, but they are fast. Got my order and drink in less than 10 mins. (There was 4 parties ahead of me).  Highly recommend their heavy oolong milk tea! They also offer free toppings!",
        rating=4,
        created_at=datetime.now()
    )
    boba2r1 = Review(
        user_id=4,
        business_id=11,
        review="The Hojicha ice cream part of the parfait was my favorite. Unlike other places that pour Hojicha syrup onto vanilla soft seeve, this place has Hojicha infused ice cream that is 'not too sweet' and tastes super toasty, creamy, and delicious almost like black sesame. The corn flakes and mochi added nice textures to the parfait. The jelly on the bottom was bland. I would just go for the Hojicha ice cream itself Next time!",
        rating=5,
        created_at=datetime.now()
    )
    kbbq1r1 = Review(
        user_id=5,
        business_id=12,
        review="Omg this place was sooo good! We ordered the signature feast which comes with 4 chefs choice cuts. I don't remember what the first two were (right and left of the picture) but the other two were pork belly and kalbi. The marbling on the meat was amazing and made it incredibly tender. The standout meat for me was the kalbi which was sooo flavorful and melted in your mouth. I would probably skip the pork belly as it was kind of chewy and didn't compare to the beef cuts.",
        rating=5,
        created_at=datetime.now()
    )
    kbbq2r1 = Review(
        user_id=6,
        business_id=13,
        review="Finally an AYCE Kbbq in Seattle that I can see myself coming to satisfy my cravings! Came to Bellwether during their soft opening and I was pleasantly surprised.",
        rating=4,
        created_at=datetime.now()
    )
    sandwich1r1 = Review(
        user_id=3,
        business_id=14,
        review="I recently had the pleasure of trying the Caribbean roast sandwich at Paseo and I have to say, it was one of the juiciest and most flavorful sandwiches I have ever had! The combination of tender roast beef, tangy Caribbean spices, and fresh vegetables made for a truly unforgettable taste experience.",
        rating=4,
        created_at=datetime.now()
    )
    sandwich1r2 = Review(
        user_id=5,
        business_id=14,
        review="Incredibly delicious - we skated in minutes before closing, so they said we could only order the famous #1, so we ordered 2 of those. There's a reason it is rated best sandwich in Seattle, extremely delicious! The pork tastes like there is BBQ sauce even with no sauce.",
        rating=5,
        created_at=datetime.now()
    )
    sandwich2r1 = Review(
        user_id=4,
        business_id=15,
        review="Valhalla has some inventive and delicious takes on classic sandwiches! We got a Fidel Cashflow (like a Cubano but with pork belly) and an El Duderino. I personally preferred El Duderino because it felt a bit more balanced, but both sandwiches were fresh and so packed with flavor, on a crispy yet soft roll. I'd also highly recommend the tater tots with rosemary aioli!",
        rating=5,
        created_at=datetime.now()
    )

    pizza1r1.reviewImages.append(review1_1)
    pizza1r1.reviewImages.append(review1_2)
    pizza1r1.reviewImages.append(review1_3)
    pizza1r2.reviewImages.append(review2_1)
    sushi1r1.reviewImages.append(review5_1)
    sushi1r1.reviewImages.append(review5_2)
    ramen1r1.reviewImages.append(review9_1)

    all_reviews = [pizza1r1, pizza1r2, pizza1r3, pizza1r4, pizza2r1, pizza2r2, pizza2r3, burger1r1, burger1r2, burger2r1, burger2r2, sushi1r1, sushi1r2, taco1r1, taco1r2, ramen1r1, boba1r1, boba1r2, boba2r1, kbbq1r1, kbbq2r1, sandwich1r1, sandwich1r2, sandwich2r1]
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
