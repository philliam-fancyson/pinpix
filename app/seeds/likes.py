from app.models import db, ImageLike, environment, SCHEMA
from sqlalchemy.sql import text
from sqlalchemy import insert

def seed_image_likes():
    likes = []

    like1 = ImageLike(
        user_id=1,
        image_id=36
    )
    likes.append(like1)

    like1 = ImageLike(
        user_id=2,
        image_id=36
    )
    likes.append(like1)

    like1 = ImageLike(
        user_id=3,
        image_id=36
    )
    likes.append(like1)

    like1 = ImageLike(
        user_id=4,
        image_id=36
    )
    likes.append(like1)

    like1 = ImageLike(
        user_id=5,
        image_id=36
    )
    likes.append(like1)

    like1 = ImageLike(
        user_id=6,
        image_id=36
    )
    likes.append(like1)

    like1 = ImageLike(
        user_id=7,
        image_id=36
    )
    likes.append(like1)

    for like in likes:
        db.session.add(like)
    db.session.commit()

def undo_image_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.image_likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM image_likes"))

    db.session.commit()
