from rest_framework import serializers
from attendee.models import AttendExam, AttendQuestion
from examiner.models import Exam, ExamQuestion
from examiner.serializers import ExamSerializer
from account.serializers import UserProfileSerializer
from author.serializers import QuestionSerializer
from django.utils import timezone
import uuid

    
class AttendExamSerializerTimeLimit(serializers.ModelSerializer):
    exam = ExamSerializer()
    class Meta:
        model = AttendExam
        fields = ['id', 'exam','start_time']


class AttendQuestionSerializer(serializers.ModelSerializer):
    question = QuestionSerializer()
    attend_exam = AttendExamSerializerTimeLimit()
    class Meta:
        model = AttendQuestion
        fields = '__all__'

    
class AttendExamSerializer(serializers.ModelSerializer):
    attendee = UserProfileSerializer()
    exam = ExamSerializer()
    attend_questions  = serializers.SerializerMethodField()
    class Meta:
        model = AttendExam
        fields = ['id', 'attendee', 'exam', 'total_mark', 'retake_exam', 'percent_mark', 'copy_detect', 'full_screen_leave' ,'switched_tab' , 'switched_window', 'attend_questions', 'start_time', 'end_time', 'video', 'submited_at', 'is_submited', 'is_active','is_qualified','status']

    def get_attend_questions(self, obj):
        attend_questions = obj.attendquestion_set.all()
        serializer = AttendQuestionSerializer(attend_questions, many=True)
        return serializer.data

    
class AttendExamCreateSerializer(serializers.ModelSerializer):
    attendee = serializers.ReadOnlyField(source='attendee.email')
    class Meta:
        model = AttendExam
        fields = ['id', 'exam', 'attendee', 'start_time', 'retake_exam', 'submited_at', 'is_submited', 'is_active']

    def create(self, validated_data):
        try:
            exam = validated_data.get('exam')
            attend_exam = AttendExam.objects.create(**validated_data)
            exam_questions = ExamQuestion.objects.filter(exam = exam).all()
            for exam_question in exam_questions:
                AttendQuestion.objects.create(attend_exam=attend_exam, question=exam_question.question, number=exam_question.number,) #python_code = exam_question.question.python_init_code,javascript_code = exam_question.question.javascript_init_code
            return attend_exam
        
        except Exception as e:
            attend_exam.delete()
            return e
        

class AttendExamUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttendExam
        fields = ['id', 'total_mark', 'percent_mark', 'is_qualified', 'status', 'copy_detect', 'full_screen_leave' ,'switched_tab' , 'switched_window', 'start_time', 'end_time', 'video', 'submited_at', 'is_submited', 'is_active']

    def update(self, instance, validated_data):
        try:
            if instance.is_submited == False:
                # instance.total_cheat = validated_data.get('total_cheat', instance.total_cheat)
                instance.copy_detect = validated_data.get('copy_detect', instance.copy_detect)
                instance.full_screen_leave = validated_data.get('full_screen_leave', instance.full_screen_leave)
                instance.switched_tab = validated_data.get('switched_tab', instance.switched_tab)
                instance.switched_window = validated_data.get('switched_window', instance.switched_window)
                instance.end_time = validated_data.get('end_time', instance.end_time)
                instance.is_active = False
                instance.video = validated_data.get('video', instance.video)
                instance.submited_at = validated_data.get('submited_at', instance.submited_at)
                instance.is_submited = validated_data.get('is_submited', instance.is_submited)
                instance.status = validated_data.get('status', instance.status)

                attend_questions = AttendQuestion.objects.filter(attend_exam = instance).all()
                total_mark = 0
                percent_mark = 0
                for attend_question in attend_questions:
                    total_mark += attend_question.total_mark
                    percent_mark += attend_question.percent_mark

                instance.total_mark = total_mark
                instance.percent_mark = percent_mark/instance.exam.total_question
                if(instance.percent_mark >= instance.exam.passing_percent_mark):
                    instance.is_qualified = True
                else:
                    instance.is_qualified = False
                # instance.percent_mark = (total_mark / 9) * 100      # 3 questions * 3 testcases
                instance.save()
            else:
                print('Already Submited')
            return instance
        
        except Exception as e:
            return e


class AttendQuestionUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttendQuestion
        fields = ['id', 'answer', 'answer_recorded_at', 'total_mark', 'language' , 'percent_mark', 'total_passed_testcase', 'submited_at', 'is_submited', 'is_atended'] # 'python_code', 'javascript_code', 

    def update(self, instance, validated_data):
        try:
            if instance.is_submited == False:
                instance.is_atended = validated_data.get('is_atended', instance.is_atended)

                instance.answer = validated_data.get('answer', instance.answer)
                # instance.python_code = validated_data.get('python_code', instance.python_code)
                # instance.javascript_code = validated_data.get('javascript_code', instance.javascript_code)
                
                instance.answer_recorded_at = validated_data.get('answer_recorded_at', instance.answer_recorded_at)
                instance.submited_at = validated_data.get('submited_at', instance.submited_at)
                instance.is_submited = validated_data.get('is_submited', instance.is_submited)
                instance.language = validated_data.get('language', instance.language)
                instance.total_passed_testcase = validated_data.get('total_passed_testcase', instance.total_passed_testcase)
                instance.total_mark = validated_data.get('total_passed_testcase', instance.total_mark)
                instance.percent_mark = (int(instance.total_mark) * 100) / 5

                instance.save()
            else:
                print('Already Submited')
            return instance
        
        except Exception as e:
            return e
