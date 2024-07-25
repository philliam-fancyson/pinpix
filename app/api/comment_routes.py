from flask import Blueprint, request, jsonify
from flask_login import login_required
from .utils import CommentUtils

comment_routes = Blueprint("comments", __name__)

@comment_routes.route("/image/<int:id>", methods=["GET"])
def get_image_comments(id):
    return jsonify(CommentUtils.get_image_comments(id))
