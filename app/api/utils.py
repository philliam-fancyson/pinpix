from os import name
from app.models import db, User, Image
from flask_login import current_user
from flask import Response
from datetime import datetime
import json

class ImageUtils:
    """Image Utility Functions"""

    @staticmethod
    def parse_data(image_obj):
        """ Parse Image Object into python dictionary"""
        try:
            return {
                "id": image_obj.id,
                "title": image_obj.title,
                "image_url": image_obj.image_url,
                "user_id": image_obj.user_id,
                "tag_id": image_obj.tag_id,
                "created_at": image_obj.created_at
            }
        except:
            raise Exception("Invalid Image Object from query")

    @staticmethod
    def get_one_image(imageId):
        print(imageId)
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
            user_id=UserUtils.get_current_user()["id"],
            tag_id=data["tag_id"]
        )

        try:
            db.session.add(new_image)
            db.session.commit()
            return ImageUtils.parse_data(new_image)
        except:
            return 500

class UserUtils:
    """Get the current user's id """
    @staticmethod
    def get_current_user():
        """Get the current user info"""
        if current_user.is_authenticated:
            return current_user.to_dict()
        else:
            raise Exception("User not logged in")
