from flask import Blueprint, request, jsonify
from flask_login import login_required
from .utils import CollectionUtils

collection_routes = Blueprint("collections", __name__)

@collection_routes.route("/current")
def get_user_collections():
    return jsonify(CollectionUtils.get_user_collections())
