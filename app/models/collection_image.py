from .db import db, environment, SCHEMA, add_prefix_for_prod

collection_images = db.Table(
    'collection_images',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('collection_id', db.Integer, db.ForeignKey(add_prefix_for_prod('collections.id'))),
    db.Column('image_id', db.Integer, db.ForeignKey(add_prefix_for_prod('images.id')))
    )

if environment == "production":
    collection_images.schema = SCHEMA

# class CollectionImage(db.Model):
#     __tablename__ = 'collection_images'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     collection_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("collections.id")), primary_key=True),
#     image_id = db.Column("image_id", db.ForeignKey(add_prefix_for_prod("images.id")), primary_key=True)

#     collection = db.relationship('Collection', foreign_keys='CollectionImage.collection_id')
#     image = db.relationship('Image', foreign_keys='CollectionImage.image_id')

# class CollectionImage(db.Table):
#     __tablename__ = 'collection_images'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     collection_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("collections.id")), primary_key=True),
#     image_id = db.Column("image_id", db.ForeignKey(add_prefix_for_prod("images.id")), primary_key=True)

#     # collection = db.relationship('Collection', foreign_keys='CollectionImage.collection_id')
#     # image = db.relationship('Image', foreign_keys='CollectionImage.image_id')
