from django.utils import timezone
from django.http import Http404
from django.core.mail import EmailMultiAlternatives, EmailMessage, send_mail

from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated

from datetime import datetime, timedelta
from itertools import chain
import os

# for HackerEarth API4
import requests
import json
from admin_site.settings import BASE_DIR

# for generating pdf invoice
from io import BytesIO
from django.http import HttpResponse
from django.template.loader import get_template
from xhtml2pdf import pisa
from django.views.decorators.csrf import csrf_exempt
from django.contrib.staticfiles import finders
from django.template.loader import render_to_string
from qrcode import *


from examiner.models import Exam
from examiner.custom_permissions import IsExaminerPermission, IsOwnExaminerPermission
from attendee.renderers import AttendExamRenderer
from attendee.custom_permissions import IsAttendeePermission, IsOwnAttendeePermission, IsOwnAttendQuestionAttendeePermission
from attendee.models import AttendExam, AttendQuestion
from attendee.serializers import AttendExamSerializer, AttendExamCreateSerializer, AttendExamUpdateSerializer, AttendQuestionUpdateSerializer, AttendQuestionSerializer
from admin_site.settings import MEDIA_URL, BASE_DIR, MEDIA_ROOT

########### for Attendee ################

# check exam start function
def check_exam_start_fun(exam_id):
    # exam_idUUID = uuid.UUID(str(exam_id))
    start_now = True
    start_now_msg = 'Give Your BEST in Exam'

    exam = Exam.objects.filter(id=exam_id).all()
    if exam:
        exam = Exam.objects.get(id=exam_id)
        temp_exam_start_time = timezone.now()
        temp_exam_end_time = temp_exam_start_time + timedelta(hours = int(exam.time_limit_hour), minutes=int(exam.time_limit_minute))

        converted_start_time = None
        converted_end_time = None
        
        if exam.start_time != None:
            converted_start_time = exam.start_time + timedelta(hours=5,minutes=30)
        if exam.end_time != None:
            converted_end_time = exam.end_time + timedelta(hours=5,minutes=30)
        converted_temp_exam_start_time = temp_exam_start_time + timedelta(hours=5,minutes=30)
        converted_temp_exam_end_time = temp_exam_end_time + timedelta(hours=5,minutes=30)


        if converted_start_time != None :
            if converted_start_time > converted_temp_exam_start_time :
                start_now = False
                start_now_msg = 'not_started'
            elif converted_temp_exam_start_time > converted_end_time :
                start_now = False
                start_now_msg = 'closed'
            elif converted_temp_exam_end_time > converted_end_time :
                start_now = False
                start_now_msg = 'not_enough_time'
            else:
                pass

        extra = {'start_now':start_now, 'start_now_msg': start_now_msg, 'start_at': converted_start_time, 'end_at': converted_end_time, 'time_limit_hour' : exam.time_limit_hour,  'time_limit_minute' : exam.time_limit_minute, 'is_time_limit' : exam.is_time_limit }
    
    else:
        start_now = False
        start_now_msg = 'Exam Not Available'
        extra = {'start_now':start_now, 'start_now_msg': start_now_msg}
        
    return extra


# create new Question    
class CreateAttendExamAPIView(APIView):
    # renderer_classes = [AttendExamRenderer]
    permission_classes = [IsAuthenticated, IsAttendeePermission]
    message = "You are not Authenticated to access to permission"
    
    def perform_create(self, serializer):
        serializer.save(attendee=self.request.user)

    def post(self, request, format=None):
        extra = check_exam_start_fun(exam_id = request.data['exam'])
        if extra['start_now'] :
            data = request.data
            data['start_time'] = timezone.now()
            data['is_active'] = True
            serializer = AttendExamCreateSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            serializer.save()
            
            return Response({'msg': 'AttendExam Created Successfully','data':{'data': serializer.data, 'extra': extra}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'msg': 'Can not create', 'extra': extra}, status=status.HTTP_400_BAD_REQUEST)

# get single AttendExam
class RetriveAttendExamAPIView(APIView):
    # renderer_classes = [AttendExamRenderer]
    permission_classes = [IsAuthenticated, IsAttendeePermission, IsOwnAttendeePermission]
    def get_object(self, pk):
        try:
            return AttendExam.objects.get(pk=pk)
        except AttendExam.DoesNotExist:
            raise Http404
    
    def get(self,request, pk, format=None):
        attend_exam = self.get_object(pk)
        self.check_object_permissions(request, attend_exam)
        serializer = AttendExamSerializer(attend_exam)
        if serializer.data['is_submited'] == False:
            return Response({'msg':'Attend Exam Detail get successfully', 'data':serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'msg':'Attend Exam is Submmied Already. You can not change it'}, status=status.HTTP_406_NOT_ACCEPTABLE)
    
# check for exam started or not
class CheckExamStartAPIView(APIView):
    # renderer_classes = [AttendExamRenderer]
    permission_classes = [AllowAny]
    def get_object(self, pk):
        try:
            return Exam.objects.get(pk=pk)
        except Exam.DoesNotExist:
            raise Http404
        
    def get(self, request, pk, format=None):
        exam = self.get_object(pk)
        extra = check_exam_start_fun(exam_id = exam.id)
        return Response({'msg': 'Exam Start Checked Successfully', 'data':{'extra': extra}}, status=status.HTTP_200_OK)


# end attend exam ( update end time) 
class EndAttendExamAPIView(APIView):
    # renderer_classes = [AttendExamRenderer]
    permission_classes = [IsAuthenticated, IsAttendeePermission, IsOwnAttendeePermission]
    message = "You are not Authenticated to acces to permission"
    def get_object(self, pk):
        try:
            return AttendExam.objects.get(pk=pk)
        except AttendExam.DoesNotExist:
            raise Http404
        
    def patch(self, request, pk, format=None):
        attend_exam = self.get_object(pk)
        self.check_object_permissions(request, attend_exam)
        data = request.data
        data['end_time'] = timezone.now() 
        data['is_active'] = False
        data['submited_at'] = timezone.now()
        data['is_submited'] = True
        serializer = AttendExamUpdateSerializer(instance=attend_exam, data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Attend Exam End time updated Successfully','data': serializer.data, 'extra': 'your exam ended'}, status=status.HTTP_200_OK)
           
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# start attending question
class StartAttendQuestionAPIView(APIView):
    # renderer_classes = [AttendExamRenderer]
    permission_classes = [IsAuthenticated, IsAttendeePermission, IsOwnAttendQuestionAttendeePermission]
    message = "You are not Authenticated to acces to permission"
    def get_object(self, pk):
        try:
            return AttendQuestion.objects.get(pk=pk)
        except AttendQuestion.DoesNotExist:
            raise Http404
        
    def put(self, request, pk, format=None):
        attend_question = self.get_object(pk)
        self.check_object_permissions(request, attend_question)
        data = request.data
        data['is_atended'] = True
        serializer = AttendQuestionUpdateSerializer(instance=attend_question, data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Attend Question start updated Successfully','data': serializer.data}, status=status.HTTP_200_OK)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# get single AttendQuestion
class RetriveAttendQuestionAPIView(APIView):
    # renderer_classes = [AttendExamRenderer]
    permission_classes = [IsAuthenticated, IsAttendeePermission, IsOwnAttendQuestionAttendeePermission]
    def get_object(self, pk):
        try:
            return AttendQuestion.objects.get(pk=pk)
        except AttendQuestion.DoesNotExist:
            raise Http404
    
    def get(self,request, pk, format=None):
        attend_question = self.get_object(pk)
        self.check_object_permissions(request, attend_question)
        serializer = AttendQuestionSerializer(attend_question)
        if serializer.data['is_submited'] == False:
            return Response({'msg':'Attend Question Found','data':serializer.data},status=status.HTTP_200_OK)
        else:
            return Response({'msg':'Attend Question is Submmied Already. You can not change it'}, status=status.HTTP_406_NOT_ACCEPTABLE)
    
# update ( submit) attend question (answer, mark)
class UpdateAttendQuestionAPIView(APIView):
    # renderer_classes = [AttendExamRenderer]
    permission_classes = [IsAuthenticated, IsAttendeePermission, IsOwnAttendQuestionAttendeePermission]
    message = "You are not Authenticated to acces to permission"
    def get_object(self, pk):
        try:
            return AttendQuestion.objects.get(pk=pk)
        except AttendQuestion.DoesNotExist:
            raise Http404
        
    def put(self, request, pk, format=None):
        attend_question = self.get_object(pk)
        self.check_object_permissions(request, attend_question)
        data = request.data
        data['answer_recorded_at'] = timezone.now()
        serializer = AttendQuestionUpdateSerializer(instance=attend_question, data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Attend Question answer updated Successfully','data': serializer.data}, status=status.HTTP_200_OK)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# end ( submit) attend question (answer, mark)
class EndAttendQuestionAPIView(APIView):
    # renderer_classes = [AttendExamRenderer]
    permission_classes = [IsAuthenticated, IsAttendeePermission, IsOwnAttendQuestionAttendeePermission]
    message = "You are not Authenticated to acces to permission"
    def get_object(self, pk):
        try:
            return AttendQuestion.objects.get(pk=pk)
        except AttendQuestion.DoesNotExist:
            raise Http404
        
    def put(self, request, pk, format=None):
        attend_question = self.get_object(pk)
        self.check_object_permissions(request, attend_question)
        data = request.data

        answer = data['answer']
        language = data['language']
        testcases = data['testcases']

        result = submit_view(answer = answer, language = language, testcases= testcases)

        testcaseResults = result['data']['testcaseResults']
        passedTestcases = result['data']['passedTestcases']

        data['answer_recorded_at'] = timezone.now()
        data['submited_at'] = timezone.now()
        data['is_submited'] = True
        data['total_passed_testcase'] = passedTestcases
        serializer = AttendQuestionUpdateSerializer(instance=attend_question, data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Attend Question end updated Successfully','data': {'data' : serializer.data, 'testcaseResults': testcaseResults, 'passedTestcases': passedTestcases}}, status=status.HTTP_200_OK)
           
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# run custom input code
@api_view(['POST'])
def run_code_view(request):
    source = request.data['answer']
    language = request.data['language']
    validInput = request.data['inputVal']

    data = {    
        'source': source,
        'lang': language,
        'time_limit': 5,
        'memory_limit': 246323,
        'input': validInput,
        'id': "client-001"
    }

    headers = {"client-secret": os.environ.get('CLIENT_SECRET')}
    resp = requests.post(os.environ.get('CODE_EVALUATION_URL'), json=data, headers=headers)
    dict = json.loads(resp.text)
    print('dict' , dict)
    status = 'NA'
    success = False
    errorMsg = ''
    output = ''

    while True:
        resp = requests.get(dict['status_update_url'], headers=headers)
        dict = json.loads(resp.text)
        request_status = dict['request_status']
        compile_status = dict['result']['compile_status']
        print('dict' , dict)
        if(request_status['code'] == 'CODE_COMPILED' and compile_status != 'OK'):
            errorMsg = compile_status
            break
        else:
            run_status = dict['result']['run_status']
            output_file_path = run_status['output']

            status = run_status['status']
            if status == 'RE':
                print(status)
                errorMsg = run_status['stderr']
                break
            elif status == 'AC':
                print(status)
                success = True
                break

    if(status != 'NA'):
        resp = requests.get(output_file_path, headers=headers)
        output = resp.text.rstrip()

    testcaseResults = []

    if success == True:
        return Response({'msg':'OK','data':{'testcaseResults': testcaseResults, 'output': output, 'success': success}})
    else:
        return Response({'msg':'OK','data':{'testcaseResults': testcaseResults, 'output': output, 'success': success, 'errorMsg' : errorMsg}})

# run initial 2 testcases
@api_view(['POST'])
def run_testcase_view(request):
    source = request.data['answer']
    language = request.data['language']
    testcases = request.data['testcases'][0:2]

    testcaseResults = []
    inputs = []
    outputs = []
    errorMsgs = []
    passedTestcases = 0

    for testcase in testcases:
        validInput = testcase['input']
        validOutput = testcase['output']

        inputs.append(validInput)

        data = {    
            'source': source,
            'lang': language,
            'time_limit': 5,
            'memory_limit': 246323,
            'input': validInput,
            'id': "client-001"
        }
        headers = {"client-secret": os.environ.get('CLIENT_SECRET')}
        resp = requests.post(os.environ.get('CODE_EVALUATION_URL'), json=data, headers=headers)
        dict = json.loads(resp.text)

        status = 'NA'
        success = False
        errorMsg = ''
        output = ''

        while True:
            resp = requests.get(dict['status_update_url'], headers=headers)
            dict = json.loads(resp.text)
            request_status = dict['request_status']
            compile_status = dict['result']['compile_status']

            if(request_status['code'] == 'CODE_COMPILED' and compile_status != 'OK'):
                errorMsg = compile_status
                errorMsgs.append(errorMsg)
                break
            else:
                run_status = dict['result']['run_status']
                output_file_path = run_status['output']

                status = run_status['status']
                if status == 'RE':
                    errorMsg = run_status['stderr']
                    errorMsgs.append(errorMsg)
                    break
                elif status == 'AC':
                    success = True
                    errorMsgs.append('')
                    break
        if(status != 'NA'):
            resp = requests.get(output_file_path, headers=headers)
            output = resp.text.rstrip()
        outputs.append(output)

        if output == validOutput:
            testcaseResults.append(True)
            passedTestcases += 1
        else:
            testcaseResults.append(False)

    return Response({'msg':'OK','data':{'testcaseResults': testcaseResults,'inputs':inputs, 'outputs': outputs, 'passedTestcases': passedTestcases, 'errorMsgs' : errorMsgs}})

# run all 5 testcases
def submit_view(answer, language, testcases):

    testcaseResults = []
    passedTestcases = 0

    for testcase in testcases:
        validInput = testcase['input']
        validOutput = testcase['output']

        data = {    
            'source': answer,
            'lang': language,
            'time_limit': 5,
            'memory_limit': 246323,
            'input': validInput,
            'id': "client-001"
        }
        print("data" , data)
        headers = {"client-secret": os.environ.get('CLIENT_SECRET')}
        resp = requests.post(os.environ.get('CODE_EVALUATION_URL'), json=data, headers=headers)
        dict = json.loads(resp.text)
 
        status = 'NA'
        success = False 
        errorMsg = ''
        output = ''
        print("dict ====>" , dict)
        while True:
            resp = requests.get(dict['status_update_url'], headers=headers)
            dict = json.loads(resp.text)
            request_status = dict['request_status']
            compile_status = dict['result']['compile_status']
            print("compile_status" , dict)

            if(request_status['code'] == 'CODE_COMPILED' and compile_status != 'OK'):
                errorMsg = compile_status
                break
            else:
                run_status = dict['result']['run_status']
                output_file_path = run_status['output']

                status = run_status['status']
                if status == 'RE':
                    errorMsg = run_status['stderr']
                    break
                elif status == 'AC':
                    success = True
                    break
                
        if(status != 'NA'):
            resp = requests.get(output_file_path, headers=headers)
            output = resp.text.rstrip()
            print({resp , output})
        if output == validOutput:
            testcaseResults.append(True)
            passedTestcases += 1
        else:
            testcaseResults.append(False)

    return ({'msg':'OK','data':{'testcaseResults': testcaseResults, 'passedTestcases': passedTestcases}})



############# for examiner #################

# attend exam list of exam
class AttendExamListOfExamAPIView(APIView):
    # renderer_classes = [AttendExamRenderer]
    permission_classes = [IsAuthenticated, IsExaminerPermission, IsOwnExaminerPermission]
    
    def get(self, request, pk, format=None):
        exams = Exam.everything.filter(id=pk).all()
        if not exams:
            return Response({'msg': "exam not Found"})
        else:
            exam = Exam.everything.filter(id=pk).get()
            attend_exams = AttendExam.everything.filter(exam = pk)
            self.check_object_permissions(request, exam)
            serializer = AttendExamSerializer(attend_exams, many=True)
            return Response({'data':serializer.data}, status=status.HTTP_200_OK)


#  mail recorded video of candidate
class MailVideoAttendExamAPIView(APIView):
    permission_classes = [IsAuthenticated, IsExaminerPermission]

    def get(self, request, pk, *args, **kwargs):
        attend_exam = AttendExam.objects.get(id=pk)
        video_path = str(BASE_DIR) + MEDIA_URL + str(attend_exam.video)

        subject, from_email, to = 'Mail Video of Candidate Attended Exam', os.environ.get('EMAIL_FROM'), request.user.email
        text_content = 'This is an important message.\n Attendee : '+ attend_exam.attendee.name +'\nExam : '+ attend_exam.exam.title +'\nSubmit At : '+ str(attend_exam.submited_at)
        html_content = '<p>This is an <strong>important</strong> message.<br/> Attendee : '+ attend_exam.attendee.name +'<br/>Exam : '+ attend_exam.exam.title +'<br/>Submit At : '+ str(attend_exam.submited_at) +'</p>'
        msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
        msg.attach_file(video_path)
        msg.attach_alternative(html_content, "text/html")
        msg.send()
        return Response({'msg':'Mail Sent Successfully'}, status=status.HTTP_200_OK)


# attend exam list of all exam of own examinar for dashboard purpose
class AttendExamListOfAllExamsOfExaminerAPIView(APIView):
    # renderer_classes = [AttendExamRenderer]
    permission_classes = [IsAuthenticated, IsExaminerPermission, IsOwnExaminerPermission]
    
    def get(self, request, format=None):
        exams = Exam.objects.filter(created_by = request.user).all().order_by('-created_at')
        if not exams:
            return Response({'msg': "exam not Found"})
        else:
            attend_exams = []
            qualified_attend_exams = []
            for exam in exams:
                attend_exams = list(chain(attend_exams , AttendExam.objects.filter(exam = exam).order_by('-created_at')))
                qualified_attend_exams = list(chain(qualified_attend_exams , AttendExam.objects.filter(exam = exam).filter(is_qualified = True)))
            serializer = AttendExamSerializer(attend_exams, many=True)
            examCount = exams.count()
            assessedCount = len(attend_exams)
            qualifiedCount = len(qualified_attend_exams)
            return Response({'data':{'data':serializer.data,'examCount':examCount,'assessedCount':assessedCount,'qualifiedCount':qualifiedCount,}}, status=status.HTTP_200_OK)
              

# By examiner get single AttendExam
class RetriveAttendExamByExaminerAPIView(APIView):
    # renderer_classes = [AttendExamRenderer]
    permission_classes = [IsAuthenticated, IsOwnAttendeePermission]
    def get_object(self, pk):
        try:
            return AttendExam.everything.get(pk=pk)
        except AttendExam.DoesNotExist:
            raise Http404
    
    def get(self,request, pk, format=None):
        attend_exam = self.get_object(pk)
        self.check_object_permissions(request, attend_exam)
        serializer = AttendExamSerializer(attend_exam)
        return Response({'msg':'Attend Exam Detail get successfully', 'data':serializer.data}, status=status.HTTP_200_OK)
    

# craete pdf and qr code and mail result to attendee    
def send_result_pdf_mail(attdend_exam_data,pk):
    data = {
        'attend_exam_id': attdend_exam_data['id'],
        'attendee_name': attdend_exam_data['attendee']['name'],
        'attendee_email': attdend_exam_data['attendee']['email'],
        'attendee' : attdend_exam_data['attendee'],
        'exam_title' : attdend_exam_data['exam']['title'],
        'exam_description' : attdend_exam_data['exam']['description'],
        'exam_passing_percent_mark' : attdend_exam_data['exam']['passing_percent_mark'],
        'exam_created_by' : attdend_exam_data['exam']['created_by']['email'],
        'attend_exam_is_qualified' : attdend_exam_data['is_qualified'],
        'attend_exam_start_time' : attdend_exam_data['start_time'],
        'attend_exam_end_time' : attdend_exam_data['end_time'],
        'attend_exam_submited_at' : attdend_exam_data['submited_at'],
        'attend_exam_total_cheat' : attdend_exam_data['total_cheat'],
        'attend_questions' : attdend_exam_data['attend_questions'],
        'MEDIA_ROOT' : MEDIA_ROOT,
        'download_link' : os.environ.get('BACKEND_END_DOMAIN_LINK')+"api/attendee/download_attend_exam_result_pdf/"+pk,
    }

    fdata = os.environ.get('BACKEND_END_DOMAIN_LINK')+"api/attendee/download_attend_exam_result_pdf/"+pk
    qrcode = make(fdata)
    qrcode.save("media/qrcode/attend_exam/"+str(pk)+".png")
    
    template = get_template('attendee/mailAttendExamPdf.html')
    html  = template.render(data)
    result = BytesIO()
    pdf = pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")), result)#, link_callback=fetch_resources)
    pdf = result.getvalue()
    filename = 'AttendExamResult.pdf'

    subject = 'Attend Exam Result Detail'
    message = render_to_string('attendee/mailAttendExamText.html', data)
    recipient = attdend_exam_data['attendee']['email']
    email = EmailMessage(subject, 
        message,
        os.environ.get('EMAIL_USER'),
        [recipient]
    )
    
    #   email.attach_alternative(message, "text/html")
    email.attach(filename, pdf, 'application/pdf')
    email.send(fail_silently=True)
    

# mail attend Exam PDF
class MailAttendExamPDFAPIView(APIView):
    # renderer_classes = [AttendExamRenderer]
    permission_classes = [IsAuthenticated, IsOwnAttendeePermission]
    def get_object(self, pk):
        try:
            return AttendExam.everything.get(pk=pk)
        except AttendExam.DoesNotExist:
            raise Http404
    
    def get(self,request, pk, format=None):
        attend_exam = self.get_object(pk)
        self.check_object_permissions(request, attend_exam)
        serializer = AttendExamSerializer(attend_exam)
        attdend_exam_data = serializer.data

        send_result_pdf_mail(attdend_exam_data,pk)
    
        return Response({'msg':'Attend Exam Result Mail Successfully', 'data':serializer.data}, status=status.HTTP_200_OK)


# download attend Exam Result PDF
class DownloadAttendExamResultPDFAPIView(APIView):
    # renderer_classes = [AttendExamRenderer]
    # permission_classes = [IsAuthenticated, IsOwnAttendeePermission]
    permission_classes = [AllowAny]
    def get_object(self, pk):
        try:
            return AttendExam.everything.get(pk=pk)
        except AttendExam.DoesNotExist:
            raise Http404
    
    def get(self,request, pk, format=None):
        attend_exam = self.get_object(pk)
        self.check_object_permissions(request, attend_exam)
        serializer = AttendExamSerializer(attend_exam)
        attdend_exam_data = serializer.data

        data = {
            'attend_exam_id': attdend_exam_data['id'],
            'attendee_name': attdend_exam_data['attendee']['name'],
            'attendee_email': attdend_exam_data['attendee']['email'],
            'attendee' : attdend_exam_data['attendee'],
            'exam_title' : attdend_exam_data['exam']['title'],
            'exam_description' : attdend_exam_data['exam']['description'],
            'exam_passing_percent_mark' : attdend_exam_data['exam']['passing_percent_mark'],
            'exam_created_by' : attdend_exam_data['exam']['created_by']['email'],
            'attend_exam_is_qualified' : attdend_exam_data['is_qualified'],
            'attend_exam_start_time' : attdend_exam_data['start_time'],
            'attend_exam_end_time' : attdend_exam_data['end_time'],
            'attend_exam_submited_at' : attdend_exam_data['submited_at'],
            'attend_exam_total_cheat' : attdend_exam_data['total_cheat'],
            'attend_questions' : attdend_exam_data['attend_questions'],
            'MEDIA_ROOT' : MEDIA_ROOT,
        }

        fdata = os.environ.get('BACKEND_END_DOMAIN_LINK')+"api/attendee/download_attend_exam_result_pdf/"+pk
        qrcode = make(fdata)
        qrcode.save("media/qrcode/attend_exam/"+str(pk)+".png")
        
        template = get_template('attendee/mailAttendExamPdf.html')
        html  = template.render(data)
        result = BytesIO()
        pdf = pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")), result)#, link_callback=fetch_resources)
        pdf = result.getvalue()
        return HttpResponse(pdf, content_type='application/pdf')



    
    