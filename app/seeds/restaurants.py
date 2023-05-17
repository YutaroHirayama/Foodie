from app.models import db, Restaurant, environment, SCHEMA
from sqlalchemy.sql import text


def seed_restaurants():
    pizza1 = Restaurant(
        name='Serious Pie Downtown',
        phone_number='2068387388',
        address='2001 4th Ave',
        city='Seattle',
        state='Washington',
        zipcode='98121',
        lat=47.61296191169304,
        lng=-122.34061046489039,
        price='$$',
        description='our dough is hand-crafted through a multiple day process which gives it complexity. the crust is then blistered in 600-degree heat until lightly browned. they are then topped with things like housemade charcuterie, foraged mushrooms, and imported cheeses. we source fresh vegetables and herbs from prosser, washington which utilizes the bounty of the pacific northwest.',
        category = 'Pizza',
        website='https://www.seriouspieseattle.com/location/serious-pie-downtown/',
        owner_id=1
    )
    pizza2 = Restaurant(
        name="Rocco's",
        phone_number='2063974210',
        address='2312 2nd Ave Seattle',
        city='Seattle',
        state='Washington',
        zipcode='98121',
        lat=47.61458886080757,
        lng=-122.34605458816941,
        price='$$',
        description='Specialty Bar & Pizzeria : Extensive and unique selection of Spirits, Beer 120 PLus, Cocktails and Wine. Vegan, Gluten Free, Organic, Local, Artisan and the Heights quality of ingredients.',
        category = 'Bars, Pizza',
        website='https://www.roccosseattle.com/',
        owner_id=2
    )

    burger1 = Restaurant(
        name='8oz Burger & Co',
        phone_number='2063974210',
        address='2312 2nd Ave Seattle',
        city='Seattle',
        state='Washington',
        zipcode='98121',
        lat=47.61495754338527,
        lng=-122.32078860001081,
        price='$$',
        description='Handcrafted, ingredient driven burgers.',
        category = 'Burgers, Whiskey Bars, Cocktail Bars',
        website='https://www.8ozburgerandco.com/',
        owner_id=1
    )

    burger2 = Restaurant(
        name='Uneeda Burger',
        phone_number='2065472600',
        address='4302 Fremont Ave N',
        city='Seattle',
        state='Washington',
        zipcode='98103',
        lat=47.65964056920178,
        lng=-122.34974111122028,
        price='$$',
        description='Handcrafted, ingredient driven burgers.',
        category = 'Burgers, Sandwiches',
        website='http://uneedaburger.com/',
        owner_id=2
    )

    all_restaurants = [pizza1, pizza2, burger1, burger2]
    add_restaurants = [db.session.add(restaurant) for restaurant in all_restaurants]
    db.session.commit()
    print('all restaurants added')



def undo_restaurants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.restaurants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM restaurants"))

    db.session.commit()
