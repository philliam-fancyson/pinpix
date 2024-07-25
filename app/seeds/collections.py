from app.models import db, Collection, collection_images, environment, SCHEMA
from sqlalchemy.sql import text
from sqlalchemy import insert

def seed_collections():
    collections = []

    collection1 = Collection(
        title="my personal collection",
        user_id="1"
        )
    collections.append(collection1)

    collection2 = Collection(
        title="styles",
        user_id="1"
        )
    collections.append(collection2)

    collection3 = Collection(
        title="city pop vibes",
        user_id="3"
        )
    collections.append(collection3)

    for collection in collections:
        db.session.add(collection)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With pcollectionss in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_collections():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.collections RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM collections"))

    db.session.commit()

def seed_collection_images():
    # add_image = []

    # collect_img1 = collection_images(
    #     collection_id=1,
    #     image_id=1
    # )
    # add_image.append(collect_img1)

    # collect_img2 = collection_images(
    #     collection_id=1,
    #     image_id=2
    # )
    # add_image.append(collect_img2)

    # for image in add_image:
    #     db.session.add(image)
    # db.session.commit()
    db.session.execute(insert(collection_images),
                       [
                           {"collection_id": 1, "image_id": 1},
                           {"collection_id": 1, "image_id": 2},
                           {"collection_id": 1, "image_id": 15},
                           {"collection_id": 1, "image_id": 17},
                           {"collection_id": 2, "image_id": 3},
                           {"collection_id": 2, "image_id": 10},
                           {"collection_id": 2, "image_id": 20},
                           {"collection_id": 2, "image_id": 21},
                           {"collection_id": 2, "image_id": 22},
                       ],
                       )
    db.session.commit()

def undo_collection_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.collection_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM collection_images"))

    db.session.commit()
