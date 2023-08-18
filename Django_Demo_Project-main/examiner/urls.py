from django.urls import path

from examiner.views import CreateExamWithSelectedQuestionsAPIView, CreateExamWithRandomQuestionsAPIView, RetriveExamDetailByExaminerAPIView, UpdateExamAPIView, DeleteExamAPIView, RestoreExamAPIView, DeactivateExamAPIView, ActivateExamAPIView, RetriveExamByMeAPIView, MailExamLinkAPIView, RetriveExamDetailForRegisterAPIView

urlpatterns = [

    path('create_exam_with_selected_questions/', CreateExamWithSelectedQuestionsAPIView.as_view(), name="create_exam_with_selected_questions"),
    path('create_exam_with_random_questions/', CreateExamWithRandomQuestionsAPIView.as_view(), name="create_exam_with_random_questions"),
    path('mail_exam_link/<str:pk>/', MailExamLinkAPIView.as_view() , name="mail_exam_link"),
    path('examlist_by_me/', RetriveExamByMeAPIView.as_view(), name="examlist_by_me"),
    path('get_single_exam_by_examiner/<str:pk>/', RetriveExamDetailByExaminerAPIView.as_view() , name="get_single_exam_by_examiner"),
    path('update_exam/<str:pk>/', UpdateExamAPIView.as_view(), name="update_exam"),
    path('delete_exam/<str:pk>/', DeleteExamAPIView.as_view() , name="delete_exam"),
    path('restore_exam/<str:pk>/', RestoreExamAPIView.as_view() , name="restore_exam"),
    path('deactivate_exam/<str:pk>/', DeactivateExamAPIView.as_view() , name="deactivate_exam"),
    path('activate_exam/<str:pk>/', ActivateExamAPIView.as_view() , name="activate_exam"),

#  for register exam (used for Attendee)
    path('get_single_exam/<str:pk>/', RetriveExamDetailForRegisterAPIView.as_view() , name="get_single_exam"),
]