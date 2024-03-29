from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import TextAreaField, IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange, Optional, URL
from ..api.aws_helpers import ALLOWED_EXTENSIONS

def reviewImage_check(form, field):
    reviewImage = field.data
    if reviewImage:
        if(not reviewImage.endswith(('.png','.jpg','.jpeg'))):
            raise ValidationError('Review image URL must end in .png, .jpg, or .jpeg')


class ReviewForm(FlaskForm):

    reviewText = TextAreaField('reviewText', validators=[DataRequired(), Length(max=2000, message='Review can not exceed 2,000 characters.')])
    rating = IntegerField('rating', validators=[DataRequired(message='You must select a rating.'), NumberRange(min=1, max=5, message='Rating must be between 1 and 5.')])
    # image1 = StringField('image1', validators=[Optional(strip_whitespace=True), URL(message='Image must be a valid URL.'), reviewImage_check])
    # image2 = StringField('image2', validators=[Optional(strip_whitespace=True), URL(message='Image must be a valid URL.'), reviewImage_check])
    # image3 = StringField('image3', validators=[Optional(strip_whitespace=True), URL(message='Image must be a valid URL.'), reviewImage_check])
    image1 = FileField('image1', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    image2 = FileField('image2', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    image3 = FileField('image3', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
