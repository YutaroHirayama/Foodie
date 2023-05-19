from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import Business

# def phone_number_exists(form,field):
#     # Checking if phone number is in use
#     phone_number = field.data
#     business = Business.query.filter(Business.phone_number == phone_number).first()
#     if business:
#         raise ValidationError('Phone number is already in use.')

class BusinessForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    phoneNumber = StringField('phoneNumber', validators=[DataRequired()])
    address = StringField('streetAddress', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    zipcode = StringField('zipcode', validators=[DataRequired()])
    lat = DecimalField('lat')
    lng = DecimalField('lng')
    price = StringField('price', validators=[DataRequired()])
    hours = StringField('hours')
    description = TextAreaField('description')
    category = StringField('category')
    website = StringField('website')
