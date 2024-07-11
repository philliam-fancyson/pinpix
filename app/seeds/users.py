from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_users():
    demo = User(
        username='Demo',
        email='demo@aa.io',
        password='password',
        first_name="Demo",
        last_name="Man"
        )
    luna = User(
        username='Hufflepuffle',
        email='luna@aa.io',
        password='password',
        first_name="Luna",
        last_name="Lovegood"
        )
    peter = User(
        username='NYCWallCrawler',
        email='spider-man@aa.io',
        password='password',
        first_name="Peter",
        last_name="Parker"
        )

    db.session.add(demo)
    db.session.add(luna)
    db.session.add(peter)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
