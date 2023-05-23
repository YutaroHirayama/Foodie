from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError

class ReviewForm(FlaskForm):

    reviewText = TextAreaField('reviewText', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired()])
    image1 = StringField('image1')
    image2 = StringField('image2')
    image3 = StringField('image3')
