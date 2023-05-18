from app.models import db, Business, environment, SCHEMA
from sqlalchemy.sql import text
from businessImages import pizza1_1, pizza2_1, burger1_1, burger2_1
def seed_businesses():
    pizza1 = Business(
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
    pizza2 = Business(
        name="Rocco's",
        phone_number='2064665989',
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

    burger1 = Business(
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

    burger2 = Business(
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

    pizza1.businessImages.append(pizza1_1)
    pizza2.businessImages.append(pizza2_1)
    burger1.businessImages.append(burger1_1)
    burger2.businessImages.append(burger2_1)

    all_businesses = [pizza1, pizza2, burger1, burger2]
    add_businesses = [db.session.add(business) for business in all_businesses]
    db.session.commit()
    print('all businesses added')



def undo_businesses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM businesses"))

    db.session.commit()
