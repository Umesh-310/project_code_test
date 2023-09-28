from django.urls import path

from author.views import CreateQuestionAPIView, RetriveQuestionDetailAPIView
from author.views import RetriveQuestionDetailByMeAPIView, AllQuestionsAPIView, UpdateQuestionAPIView, UpdateTestcaseAPIView, DeleteQuestionAPIView, RestoreQuestionAPIView, RetriveQuestionByMeAPIView, QuestionListAPIView
from author.views import GetTotalQuestionAPIView

app_name = 'mainadmin'

urlpatterns = [
    path('get_single_question/<str:pk>/', RetriveQuestionDetailAPIView.as_view(), name="get_single_question"),
    path('questionlist/', QuestionListAPIView.as_view(), name="questionlist"),
    
    # for object realated own Author
    path('all_questionlist/', AllQuestionsAPIView.as_view(), name="all_questionlist"),
    path('create_question/', CreateQuestionAPIView.as_view(), name="create_question"),
    path('get_single_question_by_me/<str:pk>/', RetriveQuestionDetailByMeAPIView.as_view(), name="get_single_question_by_me"),
    path('questionlist_by_me/', RetriveQuestionByMeAPIView.as_view(), name="questionlist_by_me"),
    path('update_question/<str:pk>/', UpdateQuestionAPIView.as_view(), name="update_question"),
    path('update_testcase/<str:pk>/', UpdateTestcaseAPIView.as_view(), name="update_testcase"),
    path('delete_question/<str:pk>/', DeleteQuestionAPIView.as_view(), name="delete_question"),
    path('restore_question/<str:pk>/', RestoreQuestionAPIView.as_view(), name="restore_question"),

    path('total_question/', GetTotalQuestionAPIView.as_view(), name="total_question"),
]