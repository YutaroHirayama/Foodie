from app.models import db, Business, environment, SCHEMA
from sqlalchemy.sql import text
from .businessImages import pizza1_1, pizza1_2, pizza1_3, pizza2_1, burger1_1, burger2_1, sushi1_1, sushi1_2, sushi1_3, sushi2_1, sushi2_2, sushi2_3, taco1_1, taco1_2, taco2_1, ramen1_1, ramen1_2, ramen1_3
from .users import user2

def seed_businesses():
    pizza1 = Business(
        name='Serious Pie Downtown',
        phone_number='2068387388',
        address='2001 4th Ave',
        city='Seattle',
        state='WA',
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
        state='WA',
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
        state='WA',
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
        state='WA',
        zipcode='98103',
        lat=47.65964056920178,
        lng=-122.34974111122028,
        price='$$',
        description='Handcrafted, ingredient driven burgers.',
        category = 'Burgers, Sandwiches',
        website='http://uneedaburger.com/',
        owner_id=2
    )

    sushi1 = Business(
        name="Shiro's",
        phone_number='2064439844',
        address='2401 2nd Ave Seattle',
        city='Seattle',
        state='WA',
        zipcode='98121',
        lat=47.614865187426894,
        lng=-122.34748543065385,
        price='$$$$',
        description='The first Edomae Sushi restaurant in Seattle.',
        category = 'Sushi Bars Japanese',
        website='http://www.shiros.com/',
        owner_id=1
    )

    sushi2 = Business(
        name="Sushi Kashiba",
        phone_number='2064418844',
        address='86 Pine St Ste 1 Seattle',
        city='Seattle',
        state='WA',
        zipcode='98101',
        lat=47.6100407265009,
        lng=-122.34153348306207,
        price='$$$$',
        description='Chef Shiro Kashiba has delighted Seattle diners with his culinary artistry and craft for over five decades. Located next to the Pike Place Market, Sushi Kashiba offers the highest standard Japanese cuisine that sushi lovers have come to expect from who the Seattle Times calls, the "Sushi Sensei" of Seattle.',
        category = 'Sushi Bars Japanese',
        website='https://sushikashiba.com',
        owner_id=2
    )
    taco1 = Business(
        name="Tacos Chukis",
        phone_number='2069058537',
        address='219 Broadway E Seattle',
        city='Seattle',
        state='WA',
        zipcode='98102',
        lat=47.62068320886328,
        lng=-122.32142580181724,
        price='$',
        description='',
        category = 'Mexican',
        website='https://www.seattlechukis.com',
        owner_id=1
    )
    taco2= Business(
        name="Carmelo's Tacos",
        phone_number='2066590159',
        address='110 Summit Ave E Seattle',
        city='Seattle',
        state='WA',
        zipcode='98102',
        lat=47.6189424492048,
        lng=-122.3250322153079,
        price='$',
        description='Mexico City street tacos',
        category = 'Tacos Food Stands',
        owner_id=2
    )
    ramen1 = Business(
        name="Ramen Danbo",
        phone_number='2065665479',
        address='1222 E Pine St Ste A',
        city='Seattle',
        state='WA',
        zipcode='98122',
        lat=47.61553232097482,
        lng=-122.31627155949032,
        price='$$',
        description='Fukuoka - traditional Style Tonkotsu Ramen',
        category = 'Ramen Noodles',
        website='http://ramendanbo.com',
        owner_id=1
    )


    pizza1.businessImages.append(pizza1_1)
    pizza1.businessImages.append(pizza1_2)
    pizza1.businessImages.append(pizza1_3)
    pizza2.businessImages.append(pizza2_1)
    burger1.businessImages.append(burger1_1)
    burger2.businessImages.append(burger2_1)
    sushi1.businessImages.append(sushi1_1)
    sushi1.businessImages.append(sushi1_2)
    sushi1.businessImages.append(sushi1_3)
    sushi2.businessImages.append(sushi2_1)
    sushi2.businessImages.append(sushi2_2)
    sushi2.businessImages.append(sushi2_3)
    taco1.businessImages.append(taco1_1)
    taco1.businessImages.append(taco1_2)
    taco2.businessImages.append(taco2_1)
    ramen1.businessImages.append(ramen1_1)
    ramen1.businessImages.append(ramen1_2)
    ramen1.businessImages.append(ramen1_3)



    all_businesses = [pizza1, pizza2, burger1, burger2, sushi1, sushi2, taco1, taco2, ramen1]
    add_businesses = [db.session.add(business) for business in all_businesses]
    db.session.commit()
    print('all businesses added')



def undo_businesses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM businesses"))

    db.session.commit()
