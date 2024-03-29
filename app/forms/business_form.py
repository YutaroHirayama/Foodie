from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, DecimalField, TextAreaField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError, Length, Regexp, Optional, URL, NumberRange
from ..api.aws_helpers import ALLOWED_EXTENSIONS
from app.models import Business

def business_name_exists(form, field):
    # Checking if username is already in use
    businessName = field.data
    businessId = form.data['id']
    business = Business.query.filter(Business.name == businessName).first()
    if business and not business.id == businessId:
        raise ValidationError('There is already a business with this name.')

def businessImage_check(form, field):
    businessImage = field.data
    if businessImage:
        if(not businessImage.endswith(('.png','.jpg','.jpeg'))):
            raise ValidationError('Business image URL must end in .png, .jpg, or .jpeg')

class BusinessForm(FlaskForm):
    id = IntegerField('id')
    name = StringField('name', validators=[DataRequired(), Length(max=50, message='Business name can not exceed 50 characters.'), business_name_exists])
    phoneNumber = StringField('phoneNumber', validators=[DataRequired(), Length(min=10, max=10, message='Phone Number must be 10 digits (including area code) with no spaces.'), Regexp(regex='^[0-9]+', message='Phone Number must be numbers.')])
    address = StringField('address', validators=[DataRequired(), Length(max=100, message='Street Address cannot exceed 100 characters.')])
    city = StringField('city', validators=[DataRequired(), Length(max=50, message='City can not exceed 50 characters.')])
    state = StringField('state', validators=[DataRequired(), Length(max=50, message='State can not exceed 50 characters.')])
    zipcode = StringField('zipcode', validators=[DataRequired(), Length(min=5, max=5, message='Zipcode must be 5 digits.'), Regexp(regex='^[0-9]+', message='Zipcode must be numbers.')])
    lat = DecimalField('lat', validators=[DataRequired(), NumberRange(min=-180, max=180, message='Latitude must be between -180 and 180')])
    lng = DecimalField('lng', validators=[DataRequired(), NumberRange(min=-180, max=180, message='Longitude must be between -180 and 180')])
    price = StringField('price', validators=[DataRequired()])
    # hours = StringField('hours')
    description = TextAreaField('description', validators=[Optional(strip_whitespace=True), Length(max=1000, message='Description can not exceed 1,000 characters.')])
    category = StringField('category', validators=[Optional(strip_whitespace=True), Length(max=100, message='Categories cannot exceed 100 characters'), Regexp(regex='^[A-Za-z, ]+$', message='Categories can only be alphabet letters.')])
    website = StringField('website', validators=[Optional(strip_whitespace=True), URL(message='Website must be a valid URL.')])
    # image1 = StringField('image1', validators=[Optional(strip_whitespace=True), URL(message='Image must be a valid URL.'), businessImage_check])
    # image2 = StringField('image2', validators=[Optional(strip_whitespace=True), URL(message='Image must be a valid URL.'), businessImage_check])
    # image3 = StringField('image3', validators=[Optional(strip_whitespace=True), URL(message='Image must be a valid URL.'), businessImage_check])
    image1 = FileField('image1', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    image2 = FileField('image2', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    image3 = FileField('image3', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
