from flask import Blueprint, request, jsonify
from flask_login import login_required
from .utils import CollectionUtils

collection_routes = Blueprint("collections", __name__)

# * Current User Collections
@collection_routes.route("/current", methods=["GET"])
def get_user_collections():
    return jsonify(CollectionUtils.get_user_collections())

@collection_routes.route("/current/<string:title>", methods=["GET"])
def get_collection_images(title):
    print("HIT")
    format_title = title.replace('-', ' ')
    return jsonify(CollectionUtils.get_collection_images(format_title))
