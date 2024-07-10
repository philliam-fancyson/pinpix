from .db import db, environment, SCHEMA, add_prefix_for_prod

class User(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.SAtring(2000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    tag_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("tags.id")))
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())

    # * Relationships
