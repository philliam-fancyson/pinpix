from flask import Blueprint, request, jsonify
from flask_login import login_required
from .utils import ImageUtils

image_routes = Blueprint("images", __name__)

@image_routes.route("/", methods=["GET"])
def get_all_images():
    return jsonify({"images": ImageUtils.get_all_images()})

@image_routes.route("/", methods=["POST"])
@login_required
def post_new_image():
    req_body = request.get_json()
    print(req_body)
    new_image = ImageUtils.create_new_image(req_body)
    print(new_image)
    if new_image == 500:
        return jsonify({"message": "Image creation failed"}), 500
    return jsonify(new_image), 201
