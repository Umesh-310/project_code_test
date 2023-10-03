from django_filters.rest_framework import DjangoFilterBackend
from django.http import Http404
from django.core.mail import EmailMultiAlternatives, EmailMessage, send_mail

from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView 
from rest_framework import filters, pagination
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from itertools import chain

# for generating pdf invoice
import os
from io import BytesIO
from django.http import HttpResponse
from django.template.loader import get_template
from xhtml2pdf import pisa
from django.views.decorators.csrf import csrf_exempt
from django.contrib.staticfiles import finders
from django.template.loader import render_to_string
from qrcode import *

from examiner.renderers import ExamRenderer
from examiner.serializers import ExamSerializer, ExamCreateSerializer, ExamListSerializer , ExamQuestionSerializer
from examiner.custom_permissions import IsExaminerPermission, IsOwnExaminerPermission
from examiner.models import Exam ,ExamQuestion
from author.models import Question
from attendee.models import AttendExam
from admin_site.settings import FRONT_END_DOMAIN_LINK, MEDIA_ROOT


EXAM_LINK = FRONT_END_DOMAIN_LINK + 'attend_exam/check_start_exam/'

# craete pdf and qr code and mail to exmainer
def send_pdf_mail(exam, user):
    
    data = {
        'exam_id' : exam['id'],
        'exam_title' : exam['title'],
        'exam_description' : exam['description'],
        'exam_is_time_limit' : exam['is_time_limit'],
        'exam_time_limit_hour' : exam['time_limit_hour'],
        'exam_time_limit_minute' : exam['time_limit_minute'],
        'exam_start_time' : exam['start_time'],
        'exam_end_time' : exam['end_time'],
        'exam_exam_link' : exam['exam_link'],
        'exam_created_by_name' : user.name,
        'exam_created_by_email' : user.email,
        'MEDIA_ROOT' : MEDIA_ROOT
    }

    fdata = exam['exam_link']
    qrcode = make(fdata)
    qrcode.save("media/qrcode/exam/"+str(exam['id'])+".png")
    
    template = get_template('exam/mailExamDetailPdf.html')
    html  = template.render(data)
    result = BytesIO()
    pdf = pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")), result)#, link_callback=fetch_resources)
    pdf = result.getvalue()
    filename = 'ExamDetail.pdf'

    subject = 'Exam Created'
    message = render_to_string('exam/mailExamDetailText.html', data)
    recipient = user.email
    email = EmailMessage(subject, 
        message,
        os.environ.get('EMAIL_USER'),
        [recipient]
    )
    
    #   email.attach_alternative(message, "text/html")
    email.attach(filename, pdf, 'application/pdf')
    email.send(fail_silently=True)


class MyPageNumberPagination(pagination.PageNumberPagination):
    page_size = 3
    max_page_size = 5
    page_size_query_param = 'records'
    # page_query_param = 'p'
    # last_page_strings = 'end'


# create new Exam with Selected Questions
class CreateExamWithSelectedQuestionsAPIView(APIView):
    # renderer_classes = [ExamRenderer]
    permission_classes = [IsAuthenticated, IsExaminerPermission]
    message = "You are not Authenticated to access to permission"
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def post(self, request, format=None):
        serializer = ExamCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        serializer.save()

        exam = serializer.data

        send_pdf_mail(exam, request.user)

        return Response({'msg': 'Exam Created Successfully. Please Check your Mail.','data': serializer.data}, status=status.HTTP_201_CREATED)
    

# create new Exam  with Random Questions   
class CreateExamWithRandomQuestionsAPIView(APIView):
    # renderer_classes = [ExamRenderer]
    permission_classes = [IsAuthenticated, IsExaminerPermission]
    message = "You are not Authenticated to access to permission"
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def post(self, request, format=None):
        total_question = request.data.get('total_question')
        random_question = request.data.get('random_question')

        if(random_question > 0):
            randomQues = Question.objects.all().order_by('?')[:random_question]
            ques = randomQues
        else:
            easy_question = request.data.get('easy_question')
            medium_question = request.data.get('medium_question')
            hard_question = request.data.get('hard_question')

            easyQues = Question.objects.filter(level='Easy').order_by('?')[:easy_question]
            mediumQues = Question.objects.filter(level='Medium').order_by('?')[:medium_question]
            hardQues = Question.objects.filter(level='Hard').order_by('?')[:hard_question]
            ques = list(chain(easyQues, mediumQues, hardQues))

        questions = []
        num = 0
        for que in ques:
            num += 1
            questions.append({'question':que.id, 'number':num})

        request.data['total_question'] = total_question
        request.data['questions'] = questions
        serializer = ExamCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        serializer.save()

        exam = serializer.data
        send_pdf_mail(exam, request.user)

        return Response({'msg': 'Exam Created Successfully. Please Check your Mail.','data': serializer.data}, status=status.HTTP_201_CREATED)
        

# Mail Link of single Exam
class MailExamLinkAPIView(APIView):
    renderer_classes = [ExamRenderer]
    permission_classes = [IsAuthenticated, IsExaminerPermission, IsOwnExaminerPermission]
    message = "You are not Authenticated to access to permission"
    def get_object(self, pk):
        try:
            return Exam.objects.get(pk=pk)
        except Exam.DoesNotExist:
            raise Http404
    
    def post(self, request, pk, format=None):
        exam = self.get_object(pk)
        self.check_object_permissions(request, exam)
        users = request.data['users']
        
        for user in users:
            subject = f'''Give Exam of {exam.title}'''
            message = f'''Dear {user},
            Give Your Best in Exam \n 
            Exam title : {exam.title}\n
            Exam description : {exam.description}\n
            Exam taken By : {exam.created_by.email}\n
            Exam Link : {exam.exam_link}\n
            Best of Luck'''
            send_mail(
                subject,
                message,
                # settings.EMAIL_HOST_USER,
                request.user.email,
                [user],
                fail_silently=False,
            )
        return Response({'users':users,'msg':'Mail Sent Successfully'}, status=status.HTTP_200_OK)


# list Exam by me
class RetriveExamByMeAPIView(ListAPIView):
    # renderer_classes = [QuestionRenderer]
    permission_classes = [IsAuthenticated, IsExaminerPermission, IsOwnExaminerPermission]
    # queryset = Question.everything.all()
    serializer_class = ExamListSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = ['is_active','created_by','is_deleted']
    ordering_fields = ['is_active','created_by','created_at','created_at']
    ordering = ['-created_at']     # default order
    search_fields = ['^title', 'description']
    # pagination_class = MyPageNumberPagination

    def get_queryset(self):
        user = self.request.user
        return Exam.own_objects.filter(created_by = user)


# get single Exam By Examiner
class RetriveExamDetailByExaminerAPIView(APIView):
    # renderer_classes = [ExamRenderer]
    permission_classes = [IsAuthenticated]
    def get_object(self, pk):
        try:    
            return Exam.everything.get(pk=pk)
        except Exam.DoesNotExist:
            raise Http404
    
    def get(self,request, pk, format=None):
        Exam = self.get_object(pk)
        serializer = ExamListSerializer(Exam)
        return Response({'data':serializer.data}, status=status.HTTP_200_OK)   


# get single Exam for register time
class RetriveExamDetailForRegisterAPIView(APIView):
    # renderer_classes = [ExamRenderer]
    permission_classes = [AllowAny]
    def get_object(self, pk):
        try:
            return Exam.objects.get(pk=pk)
        except Exam.DoesNotExist:
            raise Http404
    
    def get(self,request, pk, format=None):
        Exam = self.get_object(pk)
        serializer = ExamSerializer(Exam)
        return Response({'data':serializer.data}, status=status.HTTP_200_OK)


# update single Exam
class UpdateExamAPIView(APIView):
    # renderer_classes = [ExamRenderer]
    permission_classes = [IsAuthenticated, IsExaminerPermission, IsOwnExaminerPermission]
    message = "You are not Authenticated to access to permission"
    def get_object(self, pk):
        try:
            return Exam.everything.get(pk=pk)
        except Exam.DoesNotExist:
            raise Http404
    
    def put(self, request, pk, format=None):
        exam = self.get_object(pk)
        self.check_object_permissions(request, exam)
        serializer = ExamSerializer(instance=exam, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Exam Updated Successfully','data': serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# update Exam Question
class UpdateExamQuestionAPIView(APIView):
    # renderer_classes = [ExamRenderer]
    permission_classes = [AllowAny]
    message = "You are not Authenticated to access to permission"
    def get_object(self, pk):
        try:
            return Exam.everything.get(pk=pk)
        except Exam.DoesNotExist:
            raise Http404
    def get_question(self , exam , question):
        try:
            return ExamQuestion.everything.get(exam=exam, question=question)
        except ExamQuestion.DoesNotExist:
            return None 
    def get_attended(self, exam):
        try:
            return AttendExam.objects.filter(exam=exam)
        except AttendExam.DoesNotExist:
            return None

    def post(self, request, pk, format=None):
        exam = self.get_object(pk)
        attended = self.get_attended(exam)
        if attended:
            return Response({'msg': "You have already invited candidates to this assessment and can no longer modify challenges."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


        self.check_object_permissions(request, exam)
        question= request.data['question']
        exam_question = self.get_question(exam, question)

        if exam_question != None:
            return Response({'msg': "Question already present"}, status=status.HTTP_202_ACCEPTED)
        else:
            serializer = ExamQuestionSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'msg': "Question added successfully" , 'data' :serializer.data},status=status.HTTP_200_OK)
        
    def delete(self, request, pk, format=None):
        try:
            exam_question = ExamQuestion.everything.get(pk=pk)
            attended = self.get_attended(exam_question.exam)
            if attended:
                return Response({'msg': "You have already invited candidates to this assessment and can no longer modify challenges."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
            if exam_question != None:
                exam_question.delete()
                # exam_question.save()
                return Response({'msg': "Question Deleted Successfully"}, status=status.HTTP_204_NO_CONTENT)
        
        except ExamQuestion.DoesNotExist:
            return Response({'msg': "Question Not Found"}, status=status.HTTP_400_BAD_REQUEST)




# soft delete single Exam
class DeleteExamAPIView(APIView):
    renderer_classes = [ExamRenderer]
    permission_classes = [IsAuthenticated, IsExaminerPermission, IsOwnExaminerPermission]
    message = "You are not Authenticated to access to permission"
    def get_object(self, pk):
        try:
            return Exam.everything.get(pk=pk)
        except Exam.DoesNotExist:
            raise Http404
        
    def delete(self, request, pk, format=None):
        exam = self.get_object(pk)
        self.check_object_permissions(request, exam)
        exam.soft_delete()
        exam.is_updated = True
        exam.save()
        return Response({'msg': 'Exam Deleted Successfully'}, status=status.HTTP_200_OK)


# restore single Exam
class RestoreExamAPIView(APIView):
    renderer_classes = [ExamRenderer]
    permission_classes = [IsAuthenticated, IsExaminerPermission, IsOwnExaminerPermission]
    message = "You are not Authenticated to access to permission"
    def get_object(self, pk):
        try:
            return Exam.everything.get(pk=pk)
        except Exam.DoesNotExist:
            raise Http404
    
    def put(self, request, pk, format=None):
        exam = self.get_object(pk)
        self.check_object_permissions(request, exam)
        exam.restore()
        exam.is_updated = True
        exam.save()
        return Response({'msg': 'Exam Restored Successfully'}, status=status.HTTP_200_OK)


# soft Deactivate single Exam
class DeactivateExamAPIView(APIView):
    renderer_classes = [ExamRenderer]
    permission_classes = [IsAuthenticated, IsExaminerPermission, IsOwnExaminerPermission]
    message = "You are not Authenticated to access to permission"
    def get_object(self, pk):
        try:
            return Exam.everything.get(pk=pk)
        except Exam.DoesNotExist:
            raise Http404
        
    def put(self, request, pk, format=None):
        Exam = self.get_object(pk)
        self.check_object_permissions(request, Exam)
        Exam.deactivate()
        Exam.is_updated = True
        Exam.save()
        return Response({'msg': 'Exam Deactivated Successfully'}, status=status.HTTP_200_OK)


# soft Activate single Exam
class ActivateExamAPIView(APIView):
    renderer_classes = [ExamRenderer]
    permission_classes = [IsAuthenticated, IsExaminerPermission, IsOwnExaminerPermission]
    message = "You are not Authenticated to access to permission"
    def get_object(self, pk):
        try:
            return Exam.everything.get(pk=pk)
        except Exam.DoesNotExist:
            raise Http404
        
    def put(self, request, pk, format=None):
        Exam = self.get_object(pk)
        self.check_object_permissions(request, Exam)
        Exam.activate()
        Exam.is_updated = True
        Exam.save()
        return Response({'msg': 'Exam Activated Successfully'}, status=status.HTTP_200_OK)


