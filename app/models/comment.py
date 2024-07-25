from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comments(db.Model):
    __table__name = "comments"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("images.id")), nullable=False)
    text = db.Column(db.String(500), nullable=False)

    # * Relationships
    user_comments = db.relationship(
        "User", back_populates="comment_users"
    )

    image_commments = db.relationship(
        "Image", back_populates="comment_images"
    )
