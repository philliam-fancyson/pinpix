from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_users():
    demo = User( #1
        username='Demo',
        email='demo@aa.io',
        password='password',
        first_name="Demo",
        last_name="Man"
        )
    luna = User( #2
        username='Hufflepuffle',
        email='luna@email.io',
        password='password',
        first_name="Luna",
        last_name="Lovegood"
        )
    softboi = User( #3
        username="inMyFeels",
        email='keshi-fan@email.io',
        password='password',
        first_name="Kevin",
        last_name="Nguyen"
    )
    surfer = User( #4
        username="wavecatcher",
        email='islandboy@email.io',
        password='password',
        first_name="Granola",
        last_name="Kyle"
    )
    sansa = User( #5
        username="QueenOfTheNorth",
        email="Sansa@email.io",
        password="password",
        first_name="Sansa",
        last_name="Stark"
        )
    peter = User( #6
        username='NYCWallCrawler',
        email='spider-man@email.io',
        password='password',
        first_name="Peter",
        last_name="Parker"
        )
    vincent = User( #7
        username="CerberusWielder",
        email='valentine@fantasy.io',
        password='password',
        first_name='Vincent',
        last_name='Valentine'
    )
    snake = User( #8
        username='BigBoss',
        email='naked-snake@metal-gear.io',
        password='password',
        first_name='John',
        last_name='Metal Gear'
    )
    karin = User( #9
        username='rich.girl.sweep',
        email='rushdown@sf.io',
        password='password',
        first_name='Karin',
        last_name='Kanzuki'
    )
    ramona = User( #10
        username='SassySiren',
        email='ramona.flowers@email.io',
        password='password',
        first_name='Ramona',
        last_name='Roberta'
    )

    db.session.add(demo)
    db.session.add(luna)
    db.session.add(softboi)
    db.session.add(surfer)
    db.session.add(sansa)
    db.session.add(peter)
    db.session.add(vincent)
    db.session.add(snake)
    db.session.add(karin)
    db.session.add(ramona)
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
