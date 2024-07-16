from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text


def seed_images():
    images = []

    image1 = Image(
        title="Test 1",
        image_url="s3://pinpix-bucket/1f406a2cbf3f45848c5c36fac2f56e32.jpg",
        user_id="1"
        )
    images.append(image1)

    image2 = Image(
        title="Test 2",
        image_url="s3://pinpix-bucket/40022dd6f068451782cecd53150a9dc4.jpg",
        user_id="2"
        )
    images.append(image2)

    image3 = Image(
        title="Test 3",
        image_url="s3://pinpix-bucket/4d5e688442a94228a898b2119759f723.jpg",
        user_id="3"
        )
    images.append(image3)

    for image in images:
        db.session.add(image)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
