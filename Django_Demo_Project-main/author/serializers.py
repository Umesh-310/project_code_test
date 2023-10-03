from rest_framework import serializers, fields

from author.models import Question, Testcase
from account.serializers import UserProfileSerializer


class DefaultEmptyBooleanField(fields.BooleanField):
    default_empty_html = fields.empty


class TestcaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testcase
        fields = ['id','number','input','output','is_active']


class QuestionSerializer(serializers.ModelSerializer):
    created_by = UserProfileSerializer()
    testcases = serializers.SerializerMethodField()
    is_active = DefaultEmptyBooleanField(required=False)
    # is_deleted = DefaultEmptyBooleanField(required=False)
    class Meta:
        model = Question
        fields = ['id', 'title', 'description', 'example', 'level', 'question_language', 'testcases', 'is_active', 'is_private', 'is_deleted', 'python_init_code', 'javascript_init_code', 'created_by', 'created_at']
        
    def get_testcases(self,obj):
        testcases = obj.testcase_set.all()
        serializer = TestcaseSerializer(testcases, many=True)
        return serializer.data


class QuestionCreateSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.email')
    testcases = TestcaseSerializer(many= True)
    is_private = DefaultEmptyBooleanField(required=False)
    class Meta:
        model = Question
        fields = ['id', 'title', 'description', 'question_language', 'example', 'level', 'testcases', 'created_by', 'python_init_code', 'javascript_init_code','is_private']

    def create(self, validated_data):
        try:
            testcases_data = validated_data.pop('testcases')
            question = Question.objects.create(**validated_data)
            for testcase_data in testcases_data:
                Testcase.objects.create(question=question, **testcase_data)
            return question
        except Exception as e:
            return e
        

class QuestionUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        exclude = ['created_by']


class TestcaseUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testcase
        fields = ['input','output']

