from django.contrib.auth import authenticate

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny

from account.serializers import SendPasswordResetEmailSerializer, UserChangePasswordSerializer, UserLoginSerializer, UserPasswordResetSerializer, UserProfileSerializer, UserRegistrationSerializer, UserAttendeeRegistrationSerializer
from account.renderers import UserRenderer
from account.custom_permissions import IsOwnUserPermission
from account.utils import Util


# from rest_framework_simplejwt.utils import datetime_from_epoch
# from account.models import CustomOutstandingToken
# from admin_site.settings import SIMPLE_JWT
# from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken
# from rest_framework_simplejwt.exceptions import TokenBackendError, TokenError




# Generate Token Manually
def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)
  

  # jti = refresh[SIMPLE_JWT['JTI_CLAIM']]
  # exp = refresh["exp"]

  # CustomOutstandingToken.objects.create(
  #     user=user,
  #     jti=jti,
  #     token=str(refresh),
  #     created_at=refresh.current_time,
  #     # expires_at=str(exp),
  #     expires_at=datetime_from_epoch(exp),
  # )


  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }

# blacklist token
# def blacklist_tokens_for_user(self):
#   # RefreshToken.blacklist(token)
#   jti = self.payload[SIMPLE_JWT['JTI_CLAIM']]
#   exp = self.payload["exp"]

#   # Ensure outstanding token exists with given jti
#   token, _ = OutstandingToken.objects.get_or_create(
#       jti=jti,
#       defaults={
#           "token": str(self),
#           "expires_at": datetime_from_epoch(exp),
#       },
#   )

#   return BlacklistedToken.objects.get_or_create(token=token)

# # check blacklist
# def check_blacklist(self):
#   """
#   Checks if this token is present in the token blacklist.  Raises
#   `TokenError` if so.
#   """
#   jti = self.payload[SIMPLE_JWT['JTI_CLAIM']]

#   if BlacklistedToken.objects.filter(token__jti=jti).exists():
#       raise TokenError(_("Token is blacklisted"))

###################


class UserRegistrationView(APIView):
  permission_classes = [AllowAny]
  # renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = UserRegistrationSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    
    token = get_tokens_for_user(user)
    if user is not None:
      return Response({'token':token, 'msg':'Registration Successful', 'user_type': user.user_type}, status=status.HTTP_201_CREATED)
    else:
      return Response({'errors':{'non_field_errors':['Email or Password is not Valid']}}, status=status.HTTP_404_NOT_FOUND)
   
    


class UserAttendeeRegistrationView(APIView):
  permission_classes = [AllowAny]
  # renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    # request.data.is_attendee = True
    # data = request.data
    
    # data['is_attendee'] = True
    serializer = UserAttendeeRegistrationSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    
    token = get_tokens_for_user(user)
    if user is not None:
      return Response({'token':token, 'msg':'Registered Successfully', 'user_type': user.user_type, 'user':serializer.data}, status=status.HTTP_201_CREATED)
    else:
      return Response({'errors':{'non_field_errors':['Email or Password is not Valid']}}, status=status.HTTP_404_NOT_FOUND)


class UserLoginView(APIView):
  # renderer_classes = [UserRenderer]
  permission_classes = [AllowAny]
  def post(self, request, format=None):
    serializer = UserLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.data.get('email')
    password = serializer.data.get('password')
    user = authenticate(email=email, password=password)
    
    if user is not None:
      token = get_tokens_for_user(user)
      serializer = UserProfileSerializer(user)
      return Response({'token':token, 'msg':'Login Successfully', 'user_type': user.user_type, 'user' : serializer.data}, status=status.HTTP_200_OK)
    else:
      return Response({'errors':{'non_field_errors':['Email or Password is not Valid']}}, status=status.HTTP_401_UNAUTHORIZED)


class UserProfileView(APIView):
  # renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def get(self, request, format=None):
    
    serializer = UserProfileSerializer(request.user)
    return Response({'user':serializer.data}, status=status.HTTP_200_OK)
  

class UserUpdateProfileView(APIView):
  # renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated, IsOwnUserPermission]
  def patch(self, request, format=None):
    serializer = UserProfileSerializer(instance=request.user, data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response({'msg': 'Profile updated Successfully','user':serializer.data}, status=status.HTTP_200_OK)
    

class UserChangePasswordView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def post(self, request, format=None):
    serializer = UserChangePasswordSerializer(data=request.data, context={'user':request.user})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Changed Successfully'}, status=status.HTTP_200_OK)


class SendPasswordResetEmailView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = SendPasswordResetEmailSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset link send. Please check your Email'}, status=status.HTTP_200_OK)


class UserPasswordResetView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, uid, token, format=None):
    serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid, 'token':token})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset Successfully'}, status=status.HTTP_200_OK)
  

class BecomeAuthorView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated, IsOwnUserPermission]
  def patch(self, request, format=None):
    data = request.data
    data['is_author'] = True
    serializer = UserProfileSerializer(instance=request.user, data=data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    body = 'Now Your became Author. You can Create Questions your own questions'
    data = {
      'subject':'Congrates on became Author',
      'body':body,
      'to_email':request.user.email
    }
    Util.send_email(data)
    return Response({'msg': 'Profile updated Successfully','data':serializer.data}, status=status.HTTP_200_OK)
  
class BecomeExaminerView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated, IsOwnUserPermission]
  def patch(self, request, format=None):
    data = request.data
    data['is_examiner'] = True
    serializer = UserProfileSerializer(instance=request.user, data=data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    body = 'Now Your became Examiner. You take Exams.'
    data = {
      'subject':'Congrates on became Examiner',
      'body':body,
      'to_email':request.user.email
    }
    Util.send_email(data)
    return Response({'msg': 'Profile updated Successfully','data':serializer.data}, status=status.HTTP_200_OK)
  
# class UserLogoutView(APIView):
#   renderer_classes = [UserRenderer]
#   permission_classes = [IsAuthenticated]
#   def get(self, request, format=None):
#     serializer = UserLogoutSerializer(request.user)
#     # if serializer.is_valid(raise_exception=True):
#     blacklist_tokens_for_user(self)
      # return Response(serializer.data, status=status.HTTP_200_OK)