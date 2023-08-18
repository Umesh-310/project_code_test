from django.urls import path
from account.views import SendPasswordResetEmailView, UserChangePasswordView, UserLoginView, UserProfileView, UserRegistrationView, UserAttendeeRegistrationView, UserPasswordResetView, UserUpdateProfileView, BecomeAuthorView, BecomeExaminerView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('register_attendee/', UserAttendeeRegistrationView.as_view(), name='register_attendee'),
    path('login/', UserLoginView.as_view(), name='login'),
    
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('update-profile/', UserUpdateProfileView.as_view(), name='profile'),
    path('changepassword/', UserChangePasswordView.as_view(), name='changepassword'),
    
    path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), name='reset-password'),
    
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('become_author/', BecomeAuthorView.as_view(), name='become_author'),    
    path('become_examiner/', BecomeExaminerView.as_view(), name='become_examiner'),
]