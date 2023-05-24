from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length, Regexp, Optional
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def profile_check(form, field):
    profilePic = field.data
    if profilePic:
        if(not profilePic.endswith(('.png','.jpg','.jpeg'))):
            raise ValidationError('Profile picture URL must end in .png, .jpg, or .jpeg')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(message='Username is required.'), Length(min=5, max=40, message='Username must be between 5 and 40 characters.'), Regexp(regex='^[0-9A-Za-z]$', message='Username must be alphanumeric.'),username_exists])
    email = StringField('email', validators=[DataRequired(), Email(message='Valid email is required.'), Length(max=255, message='Email must be less than 255 characters.'), user_exists])
    password = StringField('password', validators=[DataRequired()])
    firstName = StringField('firstName', [DataRequired(), Length(min=1, max=50, message='First name must be less than 50 characters.')])
    lastName = StringField('lastName', validators=[DataRequired(), Length(min=1, max=50, message='Last name must be less than 50 characters.')])
    profilePic = StringField('profilePic', validators=[Optional(strip_whitespace=True), profile_check])
