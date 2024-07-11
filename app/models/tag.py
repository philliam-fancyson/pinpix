from .db import db, environment, SCHEMA

class Tag(db.Model):
    __tablename__ = 'tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255))

    # * Relationships
    image_tags = db.relationship(
        "Image", back_populates="tag_images"
    )
