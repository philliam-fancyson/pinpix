from .db import db, environment, SCHEMA, add_prefix_for_prod
from .collection_image import collection_images

class Collection(db.Model):
    __tablename__ = 'collections'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    tag_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("tags.id")))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    # * Relationships
    tag_collections = db.relationship(
        "Tag", back_populates="collection_tags"
    )

    image_collections = db.relationship(
        "Image", secondary=collection_images, back_populates="collection_images"
    )
