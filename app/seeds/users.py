from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',
        first_name='Demo',
        last_name='User',
        email='demo@aa.io',
        password='password',
        profile_pic='https://theme.zdassets.com/theme_assets/949671/b3a8969e11dee569b690ee9344ffc30affdeb6b2.png'
    )
    user1 = User(
        username='User1',
        first_name='User',
        last_name='One',
        email='user1@aa.io',
        password='password',
        profile_pic='https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg'
    )
    user2 = User(
        username='User2',
        first_name='User',
        last_name='Two',
        email='user2@aa.io',
        password='password',
        profile_pic='https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg?size=626&ext=jpg'
    )
    user3 = User(
        username='User3',
        first_name='User',
        last_name='Three',
        email='user3@aa.io',
        password='password',
        profile_pic='https://img.freepik.com/free-photo/close-up-shot-pretty-woman-with-perfect-teeth-dark-clean-skin-having-rest-indoors-smiling-happily-after-received-good-positive-news_273609-1248.jpg?size=626&ext=jpg'
    )
    user4 = User(
        username='User4',
        first_name='User',
        last_name='Four',
        email='user4@aa.io',
        password='password',
        profile_pic='https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?size=626&ext=jpg'
    )
    user5 = User(
        username='User5',
        first_name='User',
        last_name='Five',
        email='user5@aa.io',
        password='password',
        profile_pic='https://img.freepik.com/free-photo/portrait-african-american-man_23-2149072179.jpg?size=626&ext=jpg'
    )
    user6 = User(
        username='User6',
        first_name='User',
        last_name='Six',
        email='user6@aa.io',
        password='password',
        profile_pic='https://img.favpng.com/1/15/9/scalable-vector-graphics-computer-icons-user-profile-portable-network-graphics-png-favpng-n05BjRqcBz9Ub9NtAbz8GXEaN.jpg'
    )

    all_users = [demo, user1, user2, user3, user4, user5, user6]

    add_users = [db.session.add(user) for user in all_users]
    db.session.commit()
    print('all users added')


def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
