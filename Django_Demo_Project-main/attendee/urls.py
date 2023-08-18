from django.urls import path
# from attendee.views import start_exam_view, register_for_exam_view,
from attendee.views import CreateAttendExamAPIView, RetriveAttendExamAPIView, EndAttendExamAPIView, StartAttendQuestionAPIView, RetriveAttendQuestionAPIView, UpdateAttendQuestionAPIView, EndAttendQuestionAPIView, CheckExamStartAPIView, run_code_view, run_testcase_view
from attendee.views import AttendExamListOfExamAPIView,AttendExamListOfAllExamsOfExaminerAPIView, MailVideoAttendExamAPIView, RetriveAttendExamByExaminerAPIView, MailAttendExamPDFAPIView, DownloadAttendExamResultPDFAPIView
app_name = 'attendee'

urlpatterns = [

    # for attendee
    path('register_for_attend_exam/', CreateAttendExamAPIView.as_view(), name="register_for_attend_exam"),
    path('get_single_attend_exam/<str:pk>/', RetriveAttendExamAPIView.as_view(), name="get_single_attend_exam"),
    path('check_for_exam_start/<str:pk>/', CheckExamStartAPIView.as_view(), name="check_for_exam_start"),
    path('end_attend_exam/<str:pk>/', EndAttendExamAPIView.as_view(), name="end_attend_exam"),

    path('start_attend_question/<str:pk>/', StartAttendQuestionAPIView.as_view(), name="start_attend_question"),
    path('get_single_attend_question/<str:pk>/', RetriveAttendQuestionAPIView.as_view(), name="get_single_attend_question"),
    path('update_attend_question/<str:pk>/', UpdateAttendQuestionAPIView.as_view(), name="update_attend_question"),
    path('end_attend_question/<str:pk>/', EndAttendQuestionAPIView.as_view(), name="end_attend_question"),

    path('run_code_view/', run_code_view, name="run_code_view"),
    path('run_testcase_view/', run_testcase_view, name="run_testcase_view"),

    # for examiner
    path('attendexamlist_of_exam/<str:pk>/',AttendExamListOfExamAPIView.as_view(), name="attendexamlist_of_exam"),
    path('attendexamlist_of_all_exams_of_examiner/',AttendExamListOfAllExamsOfExaminerAPIView.as_view(), name="attendexamlist_of_all_exams_of_examiner"),
    path('mail_video_of_attend_exam/<str:pk>/', MailVideoAttendExamAPIView.as_view(), name="mail_video_of_attend_exam"),
    path('get_single_attend_exam_by_examiner/<str:pk>/', RetriveAttendExamByExaminerAPIView.as_view(), name="get_single_attend_exam_by_examiner"),

    path('mail_attend_exam_pdf/<str:pk>/', MailAttendExamPDFAPIView.as_view(), name="mail_attend_exam_pdf"),
    path('download_attend_exam_result_pdf/<str:pk>/', DownloadAttendExamResultPDFAPIView.as_view(), name="download_attend_exam_result_pdf"),

]