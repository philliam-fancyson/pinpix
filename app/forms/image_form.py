from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField
from ..api.pinpix_s3bucket import ALLOWED_EXTENSIONS

class ImageForm(FlaskForm):
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Create Post")

"""
Needed in backend if creating it from route. Might need to add this in form on frontend?
This allows for encryption type to recognize that there is file data and non-file data in form submission
<form action="/posts/new" method="POST" enctype="multipart/form-data">
"""
