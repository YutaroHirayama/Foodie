from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class ReviewForm(FlaskForm):

    reviewText = TextAreaField('reviewText', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired()])
