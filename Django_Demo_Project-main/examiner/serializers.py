from rest_framework import serializers
from django.core.mail import send_mail,EmailMessage
from django.conf import settings
from admin_site.settings import FRONT_END_DOMAIN_LINK, MEDIA_ROOT

from examiner.models import Exam, ExamQuestion
from account.serializers import UserProfileSerializer
from author.serializers import QuestionSerializer
from attendee.models import AttendExam


EXAM_LINK = FRONT_END_DOMAIN_LINK + 'attend_exam/check_start_exam/'

class ExamQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamQuestion
        fields = ['id','question','exam', "number"]


class ExamSerializer(serializers.ModelSerializer):
    questions = serializers.SerializerMethodField()
    created_by = UserProfileSerializer()
    class Meta:
        model = Exam
        fields = ['id','title','description', 'passing_percent_mark', 'exam_link','start_time','end_time','is_time_limit','time_limit_hour','time_limit_minute','total_question','questions','created_by','is_active', 'is_deleted']
    
    def get_questions(self,obj):
        questions = obj.examquestion_set.all()
        serializer = ExamQuestionSerializer(questions, many=True)
        return serializer.data
    
class AttendExamTotalQualifiedSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttendExam
        fields = ['is_qualified']
    


class AttendExamForViewAllSerializer(serializers.ModelSerializer):
    attendee = UserProfileSerializer()
    class Meta:
        model = AttendExam
        fields = '__all__'
    
class ExamListSerializer(serializers.ModelSerializer):
    questions = serializers.SerializerMethodField()
    total_attendee = serializers.SerializerMethodField()
    attend_exam = serializers.SerializerMethodField()
    class Meta:
        model = Exam
        fields = ['id','title','description', 'passing_percent_mark', 'exam_link','start_time','end_time','is_time_limit','time_limit_hour','time_limit_minute','total_question','questions','created_by','is_active', 'is_deleted','total_attendee','created_at','attend_exam']
    
    def get_questions(self,obj):
        questions = obj.examquestion_set.all()
        serializer = ExamQuestionSerializer(questions, many=True)
        return serializer.data
    
    def get_total_attendee(self,obj):
        total_attendee = obj.attendexam_set.all()
        serializer = AttendExamTotalQualifiedSerializer(total_attendee, many=True)
        total_attendee = 0
        qualified_attendee = 0
        for i in serializer.data:
            total_attendee += 1
            if (i['is_qualified']) == True:
                qualified_attendee += 1
        return {'total_attendee': total_attendee, 'qualified_attendee' : qualified_attendee}
    
    def get_attend_exam(self,obj):
        attend_exam = obj.attendexam_set.all().order_by('-percent_mark')
        serializer = AttendExamForViewAllSerializer(attend_exam, many=True)
        return serializer.data

class ExamCreateSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.email')
    questions = ExamQuestionSerializer(many= True)
    class Meta:
        model = Exam
        fields = ['id','title','description', 'passing_percent_mark', 'exam_link','start_time','end_time','is_time_limit','time_limit_hour','time_limit_minute','total_question','questions','created_by','is_active']

    def create(self, validated_data):
        try:
            questions_data = validated_data.pop('questions')
            exam = Exam.objects.create(**validated_data)
            
            for question_data in questions_data:
                ExamQuestion.objects.create(exam=exam, **question_data)

            exam.exam_link = EXAM_LINK + str(exam.id)
            exam.save()

            # subject = 'Exam Created'
            # message = f'Thank You for creating Exam. Now you can share this exam-link to anyone\n Exam Link : {exam.exam_link}'
            # send_mail(
            #     subject,
            #     message,
            #     settings.EMAIL_HOST_USER,
            #     [exam.created_by.email],
            #     fail_silently=False,
            # )

            return exam
        except Exception as e:
            print(e)


class ExamByMeSerializer(serializers.ModelSerializer):
    questions = serializers.SerializerMethodField()
    class Meta:
        model = Exam
        fields = ['id','title','description', 'passing_percent_mark', 'exam_link','start_time','end_time','is_time_limit','time_limit_hour','time_limit_minute','total_question','questions','created_by','is_active', 'is_deleted']
    
    def get_questions(self,obj):
        questions = obj.examquestion_set.all()
        serializer = ExamQuestionSerializer(questions, many=True)
        return serializer.data
