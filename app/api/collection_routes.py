from flask import Blueprint, request, jsonify
from flask_login import login_required
from .utils import CollectionUtils

collection_routes = Blueprint("collections", __name__)

# * Collection Info
@collection_routes.route('/boards/<int:id>',  methods=["GET"])
def get_collection_info(id):
    return jsonify(CollectionUtils.get_collection_details(id))

@collection_routes.route("/boards/<string:title>", methods=["GET"])
def get_collection_images(title):
    format_title = title.replace('-', ' ')
    return jsonify(CollectionUtils.get_collection_images(format_title))

@collection_routes.route("/create", methods=["POST"])
def create_collection():
    req_body = request.get_json()
    try:
        return jsonify(CollectionUtils.create_collection(req_body))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# * Current User Collections
@collection_routes.route("/current", methods=["GET"])
def get_user_collections():
    return jsonify(CollectionUtils.get_user_collections())

@collection_routes.route("/current/<string:title>", methods=["GET"])
def get_user_collection_images(title):
    format_title = title.replace('-', ' ')
    return jsonify(CollectionUtils.get_collection_images(format_title))
