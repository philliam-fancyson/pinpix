from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from sqlalchemy import insert

def seed_comments():
    comments = []

    comment1 = Comment(
        user_id="1",
        image_id="21",
        text="Wow this outfit is pretty cute"
    )
    comments.append(comment1)

    comment2 = Comment(
        user_id="3",
        image_id="21",
        text="cool outfit"
    )
    comments.append(comment2)

    for comment in comments:
        db.session.add(comment)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
