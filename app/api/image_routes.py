from flask import Blueprint, request, jsonify
from flask_login import login_required
from .utils import ImageUtils
from .pinpix_s3bucket import (
    upload_file_to_s3, get_unique_filename, allowed_file)

image_routes = Blueprint("images", __name__)

@image_routes.route("/", methods=["GET"])
def get_all_images():
    return jsonify(ImageUtils.get_all_images())

@image_routes.route("/<int:id>", methods=["GET"])
def get_one_image(id):
    return jsonify(ImageUtils.get_one_image(id))

@image_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_one_image(id):
    req_body = request.get_json()
    update_image = ImageUtils.update_image(id, req_body)
    if update_image == 403:
        return jsonify({"message": "Not Authorized"}), 403
    if update_image == 500:
        return jsonify({"message": "Updating Image Failed"}), 500
    return jsonify(update_image), 200

@image_routes.route("/new", methods=["POST"])
@login_required
def post_new_image():
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files['image']
    print(image)

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    try:
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            return upload, 400

        url = upload["url"]
        userData = request.form
        print(userData)
        data = {
            "title": userData['title'],
            "description": userData['description'],
            "image_url": url,
            "tag_id": None
        }
        print(data)

        return jsonify({"image": ImageUtils.create_new_image(data)})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@image_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_one_image(id):
    status = ImageUtils.delete_one_image(id)
    if status:
        return jsonify({"message": "Successfully Delete"}), 200
    else:
        return jsonify({"message": "Internal Server Error"}), 500
