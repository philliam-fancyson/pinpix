from os import name
from app.models import db, User, Image, Collection, collection_images, Comment, ImageLike, Tag
from flask_login import current_user
from flask import Response
from datetime import datetime
from sqlalchemy.orm import joinedload
from sqlalchemy import insert, delete
import json

# * ------------------------------------------- User Utility Functions -------------------------------------------
class UserUtils:
    """Get the current user's id """
    @staticmethod
    def get_current_user():
        """Get the current user info"""
        if current_user.is_authenticated:
            return current_user.to_dict()
        else:
            raise Exception("User not logged in")

# * ------------------------------------------- Image Utility Functions -------------------------------------------
class ImageUtils:
    """Image Utility Functions"""

    @staticmethod
    def parse_data(image_obj, like_obj=None):
        """ Parse Image Object into python dictionary"""
        try:
            data_parsed = {
                "id": image_obj.id,
                "title": image_obj.title,
                "description": image_obj.description,
                "image_url": image_obj.image_url,
                "user_id": image_obj.user_id,
                "tag_id": image_obj.tag_id,
                "created_at": image_obj.created_at
            }
            if like_obj:
                data_parsed['likes'] = like_obj
            return data_parsed
        except:
            raise Exception("Invalid Image Object from query")

    @staticmethod
    def get_one_image(imageId):
        one_image = Image.query.get(imageId)
        likes = ImageUtils.get_image_likes(imageId)
        return ImageUtils.parse_data(one_image, likes)

    @staticmethod
    def get_all_images():
        """Get all images from database"""
        all_images = Image.query.order_by(Image.id.desc()).limit(50)
        all_images = list(map(lambda x: ImageUtils.parse_data(x), all_images))
        return list({x["id"]: x for x in all_images}.values())

    @staticmethod
    def get_user_uploads():
        user_images = Image.query.filter(Image.user_id == UserUtils.get_current_user()["id"]).order_by(Image.id.desc())
        return list(map(lambda x: ImageUtils.parse_data(x), user_images))

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

    # * --------------------- ImageLikes ---------------------
    @staticmethod
    def get_image_likes(image_id):
        # TODO: add a check if Image exists?
        try:
            like_count = ImageLike.query.filter(ImageLike.image_id == image_id).count()
            like_obj = {
                    'like_count': like_count
                }
            if UserUtils.get_current_user():
                user_like = ImageLike.query.filter(ImageLike.user_id == UserUtils.get_current_user()["id"], ImageLike.image_id == image_id).first()
                if user_like:
                    like_obj['user_liked'] = True
                else:
                    like_obj['user_liked'] = False
            else:
                like_obj['user_liked'] = False
            return like_obj
        except:
            raise Exception("Server Error. Fix yo")

    @staticmethod
    def add_image_like(image_id):
        # TODO: add a check if Image exists?
        check_if_liked = ImageLike.query.filter(ImageLike.user_id == UserUtils.get_current_user()["id"], ImageLike.image_id == image_id).all()
        if check_if_liked:
            return 403

        new_like = ImageLike(
            user_id=UserUtils.get_current_user()["id"],
            image_id=image_id
        )

        try:
            db.session.add(new_like)
            db.session.commit()
            like_count = ImageLike.query.filter(ImageLike.image_id == image_id).count()
            return {
                    'like_count': like_count,
                    'user_liked': True
                }
        except:
            return 500

    @staticmethod
    def remove_image_like(image_id):
        # TODO: add a check if Image exists?
        try:
            like = ImageLike.query.filter(ImageLike.user_id == UserUtils.get_current_user()["id"], ImageLike.image_id == image_id).one()
        except:
            e = {'error': 'No Like Found'}, 500
            return e

        try:
            if UserUtils.get_current_user()["id"] == like.user_id:
                db.session.delete(like)
                db.session.commit()
                like_count = ImageLike.query.filter(ImageLike.image_id == image_id).count()
                return {
                        'like_count': like_count,
                        'user_liked': False
                    }, 200
            else:
                e = {'error': 'Weird Error'}, 403
        except Exception as e:
            return {'error': e}, 500

#TODO TEST THIS TODO
    @staticmethod
    def add_tag(image_id, data):
        """Add Tag to collection"""
        # TODO Test Route

        tag = Tag.query.filter(Tag.title == data['title'])
        if not tag:
            tag = Tag(
                title=data['title'],
            )
            db.session.add(tag)
            db.session.commit()
        image = Image.query.get(image_id)
        image.tag_id = tag.id
        db.session.commit()
        return True

    @staticmethod
    def remove_tag(image_id, data):
        image = Image.query.get(image_id)
        tag = Tag.query.filter(Tag.title == data['title'])
        if not tag:
            return {'error' : "Tag does not exist"}, 500
        else:
            db.session.delete(tag)
            image.tag_id = None
            db.session.commit()
            return True



# * ------------------------------------------- Collection Utility Functions -------------------------------------------
class CollectionUtils:
    """Collection Utility Functions"""

    @staticmethod
    def parse_data(collection_obj):
        """ Parse Collection Object into python dictionary"""
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
        image_exist = Image.query \
                    .join(collection_images) \
                    .filter(
                        collection_images.c.collection_id == id,
                        collection_images.c.image_id ==  image_id
                        ) \
                    .order_by(Image.id.desc()) \
                    .options(joinedload(Image.collection_images)).first()
        if image_exist:
            return True
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

# TODO TEST THIS TODO
    @staticmethod
    def add_tag(collection_id, data):
        """Add Tag to collection"""
        # TODO Test Route

        tag = Tag.query.filter(Tag.title == data['title'])
        if not tag:
            tag = Tag(
                title=data['title'],
            )
            db.session.add(tag)
            db.session.commit()
        collection = Collection.query.get(collection_id)
        collection.tag_id = tag.id
        db.session.commit()
        return True

    @staticmethod
    def remove_tag(collection_id, data):
        collection = Collection.query.get(collection_id)
        tag = Tag.query.filter(Tag.title == data['title'])
        if not tag:
            return {'error' : "Tag does not exist"}, 500
        else:
            db.session.delete(tag)
            collection.tag_id = None
            db.session.commit()
            return True


# * ------------------------------------------- Comment Utility Functions -------------------------------------------
class CommentUtils:
    """Comment Utility Functions"""

    @staticmethod
    def parse_data(comment_obj):
        """ Parse Comment Object into python dictionary"""
        try:
            return {
                "id": comment_obj.id,
                "user_id": comment_obj.user_id,
                "image_id": comment_obj.image_id,
                "text": comment_obj.text,
                "user": comment_obj.user_comments.to_dict()
            }
        except:
            raise Exception("Invalid Comment Object from query")

    @staticmethod
    def get_image_comments(image_id):
        """Query for all comments by image id"""
        comments = Comment.query.options(joinedload(Comment.user_comments)).filter_by(image_id=image_id).order_by(Comment.id.desc()).all()
        for comment in comments:
            print(comment.user_comments)
        print(str(comments))
        return list(map(lambda x: CommentUtils.parse_data(x), comments))

    @staticmethod
    def create_image_comments(image_id, data):
        """Create a comment object and commit to db"""
        new_comment = Comment(
            user_id=UserUtils.get_current_user()["id"],
            image_id=image_id,
            text=data["text"]
        )

        try:
            db.session.add(new_comment)
            db.session.commit()
            return CommentUtils.parse_data(new_comment)
        except Exception as e:
            return e

    @staticmethod
    def update_comment(comment_id, data):
        """Update an existing comment"""
        comment = Comment.query.get(comment_id)
        current_user_id = UserUtils.get_current_user()["id"]
        if not (current_user_id == comment.user_id):
            return 403

        try:
            comment.text = data['text']
            db.session.commit()
        except Exception:
            return 500

        updatedComment = Comment.query.options(joinedload(Comment.user_comments)).get(comment_id)
        return CommentUtils.parse_data(comment)

    @staticmethod
    def delete_comment(comment_id):
        """Delete a comment"""
        comment = Comment.query.get(comment_id)
        try:
            if UserUtils.get_current_user()["id"] == comment.user_id:
                db.session.delete(comment)
                db.session.commit()
                return True
            else:
                return False
        except:
            return False
