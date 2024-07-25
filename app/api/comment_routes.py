from flask import Blueprint, request, jsonify
from flask_login import login_required
from .utils import CommentUtils

comment_routes = Blueprint("comments", __name__)

@comment_routes.route("/image/<int:id>", methods=["GET"])
def get_image_comments(id):
    return jsonify(CommentUtils.get_image_comments(id))

@comment_routes.route("/image/<int:id>", methods=["POST"])
def create_image_comment(id):
    req_body = request.get_json()
    try:
        return jsonify(CommentUtils.create_image_comments(id, req_body))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@comment_routes.route("/comment/<int:id>", methods=["PUT"])
def update_comment(id):
    req_body = request.get_json()
    try:
        return jsonify(CommentUtils.update_comment(id, req_body))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@comment_routes.route("/comment/<int:id>", methods=["DELETE"])
def delete_comment(id):
    status = CommentUtils.delete_comment(id)
    if status:
        return jsonify({"message":"Successfully Deleted"}), 200
    else:
        return jsonify({"message": "Internal Server Error"}), 500
