from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator

from rest_framework import serializers, fields

from admin_site.settings import FRONT_END_DOMAIN_LINK
from account.utils import Util
from account.models import User



class DefaultEmptyBooleanField(fields.BooleanField):
  default_empty_html = fields.empty


class UserRegistrationSerializer(serializers.ModelSerializer):
  # We are writing this becoz we need confirm password field in our Registratin Request
  password2 = serializers.CharField(style={'input_type':'password'}, write_only=True, default=None)
  class Meta:
    model = User
    fields=['email', 'name', 'mobile', 'about', 'user_type', 'password', 'password2']
    extra_kwargs={
      'password':{'write_only':True}
    }

  # Validating Password and Confirm Password while Registration
  def validate(self, attrs):
    password = attrs.get('password')
    password2 = attrs.get('password2')
    if password != password2:
      raise serializers.ValidationError("Password and Confirm Password doesn't match")
    return attrs

  def create(self, validate_data):
    user = User.objects.create_user(**validate_data)
    # created, user = User.objects.update_or_create(**validate_data)
    return user
  

class UserAttendeeRegistrationSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(read_only=True)
  email2 = serializers.EmailField(default=None)
  is_admin = serializers.BooleanField(read_only=True)
  is_active = serializers.BooleanField(read_only=True)
  is_author = serializers.BooleanField(read_only=True)
  is_examiner = serializers.BooleanField(read_only=True)
  is_attendee = serializers.BooleanField(read_only=True)
  class Meta:
    model = User
    fields = '__all__'
    includes = ['email2']

  def create(self, validate_data):
    user, created = User.objects.update_or_create_user(**validate_data)
    return user


class UserLoginSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(max_length=255)
  name = serializers.CharField(read_only=True)
  class Meta:
    model = User
    fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(read_only = True)
  name = serializers.CharField(required = False)
  is_admin = DefaultEmptyBooleanField(required=False)
  is_active = DefaultEmptyBooleanField(required=False)
  is_author = DefaultEmptyBooleanField(required=False)
  is_examiner = DefaultEmptyBooleanField(required=False)
  is_attendee = DefaultEmptyBooleanField(required=False)
  class Meta:
    model = User
    exclude = ['password']


class UserChangePasswordSerializer(serializers.Serializer):
  password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  class Meta:
    fields = ['password', 'password2']

  def validate(self, attrs):
    password = attrs.get('password')
    password2 = attrs.get('password2')
    user = self.context.get('user')
    if password != password2:
      raise serializers.ValidationError("Password and Confirm Password doesn't match")
    user.set_password(password)
    user.save()
    return attrs


class SendPasswordResetEmailSerializer(serializers.Serializer):
  email = serializers.EmailField(max_length=255)
  class Meta:
    fields = ['email']

  def validate(self, attrs):
    email = attrs.get('email')
    if User.objects.filter(email=email).exists():
      user = User.objects.get(email = email)
      uid = urlsafe_base64_encode(force_bytes(user.id))
      token = PasswordResetTokenGenerator().make_token(user)
      link = FRONT_END_DOMAIN_LINK+'auth/reset_password/'+uid+'/'+token
      # Send Email
      body = 'Click Following Link to Reset Your Password '+link
      data = {
        'subject':'Reset Your Password',
        'body':body,
        'to_email':user.email
      }
      Util.send_email(data)
      return attrs
    else:
      raise serializers.ValidationError('You are not a Registered User')


class UserPasswordResetSerializer(serializers.Serializer):
  password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  class Meta:
    fields = ['password', 'password2']

  def validate(self, attrs):
    try:
      password = attrs.get('password')
      password2 = attrs.get('password2')
      uid = self.context.get('uid')
      token = self.context.get('token')
      if password != password2:
        raise serializers.ValidationError("Password and Confirm Password doesn't match")
      id = smart_str(urlsafe_base64_decode(uid))
      user = User.objects.get(id=id)
      if not PasswordResetTokenGenerator().check_token(user, token):
        raise serializers.ValidationError('Token is not Valid or Expired')
      user.set_password(password)
      user.save()
      return attrs
    except DjangoUnicodeDecodeError as identifier:
      PasswordResetTokenGenerator().check_token(user, token)
      raise serializers.ValidationError('Token is not Valid or Expired')
