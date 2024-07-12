from flask import Blueprint, request, jsonify
from app.models import db, Image
from flask_login import login_required
from .utils import ImageUtils
from .pinpix_s3bucket import (
    upload_file_to_s3, get_unique_filename)

image_routes = Blueprint("images", __name__)

@image_routes.route("/", methods=["GET"])
def get_all_images():
    return jsonify(ImageUtils.get_all_images())

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

""" Route for AWS S3 in Jinja
@image_routes.route("", methods=["POST"])
@login_required
def upload_image():
    form = ImageForm()

    if form.validate_on_submit():

        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            return render_template("post_form.html", form=form, errors=[upload])

        url = upload["url"]
        new_image = Post(image= url)
        db.session.add(new_image)
        db.session.commit()
        return redirect("/posts/all")

    if form.errors:
        print(form.errors)
        return render_template("post_form.html", form=form, errors=form.errors)

    return render_template("post_form.html", form=form, errors=None)
"""
