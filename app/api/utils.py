from os import name
from app.models import db, User, Image, Collection, collection_images
from flask_login import current_user
from flask import Response
from datetime import datetime
from sqlalchemy.orm import joinedload
from sqlalchemy import insert, delete
import json

class UserUtils:
    """Get the current user's id """
    @staticmethod
    def get_current_user():
        """Get the current user info"""
        if current_user.is_authenticated:
            return current_user.to_dict()
        else:
            raise Exception("User not logged in")

class ImageUtils:
    """Image Utility Functions"""

    @staticmethod
    def parse_data(image_obj):
        """ Parse Image Object into python dictionary"""
        try:
            return {
                "id": image_obj.id,
                "title": image_obj.title,
                "description": image_obj.description,
                "image_url": image_obj.image_url,
                "user_id": image_obj.user_id,
                "tag_id": image_obj.tag_id,
                "created_at": image_obj.created_at
            }
        except:
            raise Exception("Invalid Image Object from query")

    @staticmethod
    def get_one_image(imageId):
        one_image = Image.query.get(imageId)
        return ImageUtils.parse_data(one_image)

    @staticmethod
    def get_all_images():
        """Get all images from database"""
        all_images = Image.query.order_by(Image.id.desc()).limit(20)
        all_images = list(map(lambda x: ImageUtils.parse_data(x), all_images))
        return list({x["id"]: x for x in all_images}.values())

    @staticmethod
    def create_new_image(data):
        """Create a new image """
        new_image = Image(
            title=data["title"],
            image_url=data["image_url"],
            description=data["description"],
            user_id=UserUtils.get_current_user()["id"],
            tag_id=data["tag_id"]
        )

        try:
            db.session.add(new_image)
            db.session.commit()
            return ImageUtils.parse_data(new_image)
        except:
            return 500

    @staticmethod
    def update_image(id, details):
        """Updates an existing image by id"""
        image = Image.query.get(id)

        current_user_id = UserUtils.get_current_user()["id"]
        if not (current_user_id == image.user_id):
            return 403

        try:
            if "title" in details:
                image.title = details['title']
            if "description" in details:
                image.description = details['description']
            db.session.commit()
        except Exception:
            return 500

        updated_image = ImageUtils.get_one_image(id)
        return updated_image

    @staticmethod
    def delete_one_image(id):
        """Delete record of image"""
        image = Image.query.get(id)

        if UserUtils.get_current_user()["id"] == image.user_id:
            db.session.delete(image)
            db.session.commit()
            return True
        else:
            return False

class CollectionUtils:
    """Collection Utility Functions"""

    @staticmethod
    def parse_data(collection_obj):
        """ Parse Image Object into python dictionary"""
        try:
            return {
                "id": collection_obj.id,
                "title": collection_obj.title,
                "description": collection_obj.description,
                "tag_id": collection_obj.tag_id,
                "user_id": collection_obj.user_id,
            }
        except:
            raise Exception("Invalid Collection Object from query")

    @staticmethod
    def get_collection_details(id):
        collection_info = Collection.query.get(id)
        return CollectionUtils.parse_data(collection_info)

    @staticmethod
    def get_user_collections():
        try:
            current_user_id = UserUtils.get_current_user()["id"]
            user_collections = Collection.query.filter_by(user_id=current_user_id).order_by(Collection.id.desc())
            user_collections = list(map(lambda x:  CollectionUtils.parse_data(x), user_collections))
            return user_collections
        except:
            raise Exception("Problem grabbing collection")

    @staticmethod
    def get_collection_id_from_title(title):
        return_collection = Collection.query.filter(Collection.title.ilike(title)).first()
        if return_collection is None:
            raise Exception("Could not find collection")
        return return_collection.id

    @staticmethod
    def get_collection_images(title):
        """
        Query Collection for collection id based on title
        Query collection_images for all images based on collection id
        Query Images for all images from a list (Eager Load?)
        """
        collection_id = CollectionUtils.get_collection_id_from_title(title)
        images = Image.query \
                    .join(collection_images) \
                    .filter(
                        collection_images.c.collection_id == collection_id
                        ) \
                    .order_by(Image.id.desc()) \
                    .options(joinedload(Image.collection_images)).all()
        return list(map(lambda x: ImageUtils.parse_data(x), images))

    @staticmethod
    def create_collection(data):
        """Create a new collection"""
        new_collection = Collection(
            title=data["title"],
            description=data["description"],
            tag_id=data["tag_id"],
            user_id=UserUtils.get_current_user()["id"]
        )

        try:
            db.session.add(new_collection)
            db.session.commit()
            return CollectionUtils.parse_data(new_collection)
        except Exception as e:
            return e

    @staticmethod
    def update_collection(id, details):
        """Update an existing collection info"""
        collection = Collection.query.get(id)
        current_user_id = UserUtils.get_current_user()["id"]
        if not (current_user_id == collection.user_id):
            return 403

        try:
            if "title" in details:
                collection.title = details['title']
            if "description" in details:
                collection.description = details['description']
            db.session.commit()
        except Exception:
            return 500

        updated_collection = CollectionUtils.get_collection_details(id)
        return updated_collection

    @staticmethod
    def delete_collection(id):
        """Delete Collection record"""
        collection = Collection.query.get(id)
        if UserUtils.get_current_user()["id"] == collection.user_id:
            db.session.delete(collection)
            db.session.commit()
            return True
        else:
            return False

    @staticmethod
    def add_to_collection(id, image_id):
        """Add an image to a collection"""
        # ? Maybe add a constraint that only adds if it is unique
        # TODO check if it exists
        # TODO check if user is owner of collection
        try:
            db.session.execute(insert(collection_images), {"collection_id": id, "image_id": image_id})
            db.session.commit()
            return True
        except Exception as e:
            return e

    @staticmethod
    def remove_from_collection(id, image_id):
        """Remove image from collection"""
        # TODO check if it exists
        # TODO check if user is owner of collection

        try:
            record = delete(collection_images).where(
                collection_images.c.collection_id == id,
                collection_images.c.image_id == image_id
                )
            db.session.execute(record)
            db.session.commit()
            return True
        except Exception as e:
            return e
