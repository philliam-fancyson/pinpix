from flask import Blueprint, request, jsonify
from flask_login import login_required
from .utils import CollectionUtils

collection_routes = Blueprint("collections", __name__)

# * Collection Info
@collection_routes.route('/boards/<int:id>',  methods=["GET"])
def get_collection_info(id):
    return jsonify(CollectionUtils.get_collection_details(id))

@collection_routes.route("/boards/<string:title>", methods=["GET"])
def get_collection_details(title):
    format_title = title.replace('-', ' ')
    collection_id = CollectionUtils.get_collection_id_from_title(format_title)
    return jsonify(CollectionUtils.get_collection_details(collection_id))

@collection_routes.route("/create", methods=["POST"])
@login_required
def create_collection():
    req_body = request.get_json()
    try:
        return jsonify(CollectionUtils.create_collection(req_body))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@collection_routes.route("/boards/<int:id>", methods=["PUT"])
@login_required
def update_collection_details(id):
    req_body = request.get_json()
    update_collection = CollectionUtils.update_collection(id, req_body)
    if update_collection == 403:
        return jsonify({"message": "Not Authorized"}), 403
    if update_collection == 500:
        return jsonify({"message": "Updating Image Failed"}), 500
    return jsonify(update_collection), 200

@collection_routes.route("/boards/<int:id>", methods=["DELETE"])
@login_required
def delete_collection(id):
    status = CollectionUtils.delete_collection(id)
    if status:
        return jsonify({"message": "Successfully Deleted"}), 200
    else:
        return jsonify({"message": "Internal Server Error"}), 500

# * Collection Image
@collection_routes.route("/boards/<string:title>/images", methods=["GET"])
def get_collection_images(title):
    format_title = title.replace('-', ' ')
    return jsonify(CollectionUtils.get_collection_images(format_title))

@collection_routes.route("/boards/<int:id>/images", methods=["POST"])
@login_required
def add_image_to_collection(id):
    print("ROUTE HIT")
    try:
        image_id = request.get_json()['imageId']
        return jsonify(CollectionUtils.add_to_collection(id, image_id))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@collection_routes.route("/boards/<int:id>/images", methods=["DELETE"])
@login_required
def delete_image_from_collection(id):
    try:
        image_id = request.get_json()['imageId']
        return jsonify(CollectionUtils.remove_from_collection(id, image_id))
    except Exception as e:
        return {'error': str(e)}, 500


# * Current User Collections
@collection_routes.route("/current", methods=["GET"])
def get_user_collections():
    return jsonify(CollectionUtils.get_user_collections())

@collection_routes.route("/current/<string:title>", methods=["GET"])
def get_user_collection_images(title):
    format_title = title.replace('-', ' ')
    return jsonify(CollectionUtils.get_collection_images(format_title))

# TODO Other User Collections

# TODO
# TODO: Build out adding tag to boards
# TODO: Consider merging the two utility functions to one class
@collection_routes.route("/<int:id>/tag", methods=["POST"])
@login_required
def add_image_tag(id):
    req_body = request.get_json()
    return CollectionUtils.add_tag(id, req_body)

@collection_routes.route("/<int:id>/tag", methods=["DELETE"])
@login_required
def add_image_tag(id):
    return CollectionUtils.remove_tag(id)
