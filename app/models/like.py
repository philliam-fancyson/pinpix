from .db import db, environment, SCHEMA, add_prefix_for_prod

class ImageLike(db.Model):
    __tablename__ = "image_likes"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("images.id")), nullable=False)

    # * Relationships
    image_likes = db.relationship(
        "Image", back_populates="like_images"
    )

    user_likes = db.relationship(
        "User", back_populates="like_users"
    )


# TODO: class CollectionLike(db.model):
