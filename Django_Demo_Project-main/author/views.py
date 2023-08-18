from django_filters.rest_framework import DjangoFilterBackend
from django.http import Http404

from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework import filters, pagination

from author.renderers import QuestionRenderer
from author.serializers import QuestionSerializer, QuestionCreateSerializer, QuestionUpdateSerializer, TestcaseUpdateSerializer
from author.models import Question, Testcase
from author.custom_permissions import IsAuthorPermission, IsOwnAuthorPermission

class MyPageNumberPagination(pagination.PageNumberPagination):
    page_size = 3
    max_page_size = 5
    page_size_query_param = 'records'
    # page_query_param = 'p'
    # last_page_strings = 'end'


class QuestionListAPIView(ListAPIView):
    # renderer_classes = [QuestionRenderer]
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = ['level','is_active','created_by','is_private']
    ordering_fields = ['created_by','created_at','updated_at','level','is_active']
    ordering = ['-created_at',]     # default order
    # search_fields = ['^title', 'description', '=level']
    search_fields = ['title', 'description', 'level']
    # pagination_class = MyPageNumberPagination


# create new Question    
class CreateQuestionAPIView(APIView):
    # renderer_classes = [QuestionRenderer]
    permission_classes = [IsAuthenticated, IsAuthorPermission]
    message = "You are not Authenticated to access to permission"
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def post(self, request, format=None):
        serializer = QuestionCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        serializer.save()
        return Response({'msg': 'Question Created Successfully','data': serializer.data}, status=status.HTTP_201_CREATED)
    

# list question by me
class RetriveQuestionByMeAPIView(ListAPIView):
    # renderer_classes = [QuestionRenderer]
    permission_classes = [IsAuthenticated, IsAuthorPermission]
    serializer_class = QuestionSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = ['level','is_active','created_by','is_deleted']
    ordering = ['-created_at']     # default order
    ordering_fields = ['created_by','created_at','updated_at','level','is_active']
    # search_fields = ['^title', 'description', '=level']
    search_fields = ['title', 'description', 'level']
    # pagination_class = MyPageNumberPagination

    def get_queryset(self):
        user = self.request.user
        return Question.everything.filter(created_by = user)


# get single Question
class RetriveQuestionDetailByMeAPIView(APIView):
    # renderer_classes = [QuestionRenderer]
    permission_classes = [IsAuthenticated]
    def get_object(self, pk):
        try:
            return Question.everything.get(pk=pk)
        except Question.DoesNotExist:
            raise Http404
    
    def get(self,request, pk, format=None):
        question = self.get_object(pk)
        self.check_object_permissions(request, question)
        serializer = QuestionSerializer(question)
        return Response({'data':serializer.data, 'msg': 'Question Found'},status=status.HTTP_200_OK)
    

# get single Question
class RetriveQuestionDetailAPIView(APIView):
    # renderer_classes = [QuestionRenderer]
    permission_classes = [IsAuthenticated]
    def get_object(self, pk):
        try:
            return Question.objects.get(pk=pk)
        except Question.DoesNotExist:
            raise Http404
    
    def get(self,request, pk, format=None):
        question = self.get_object(pk)
        serializer = QuestionSerializer(question)
        return Response({'data':serializer.data, 'msg': 'Question Found'},status=status.HTTP_200_OK)
    

# update single question
class UpdateQuestionAPIView(APIView):
    # renderer_classes = [QuestionRenderer]
    permission_classes = [IsAuthenticated, IsAuthorPermission, IsOwnAuthorPermission]
    message = "You are not Authenticated to access to permission"
    def get_object(self, pk):
        try:
            return Question.everything.get(pk=pk)
        except Question.DoesNotExist:
            raise Http404
    
    def patch(self, request, pk, format=None):
        question = self.get_object(pk)
        self.check_object_permissions(request, question)
        serializer = QuestionUpdateSerializer(instance=question, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Question updated Successfully','data': serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# update single testcase
class UpdateTestcaseAPIView(APIView):
    # renderer_classes = [TestcaseRenderer]
    permission_classes = [IsAuthenticated, IsAuthorPermission, IsOwnAuthorPermission]
    message = "You are not Authenticated to access to permission"
    def get_object(self, pk):
        try:
            return Testcase.everything.get(pk=pk)
        except Testcase.DoesNotExist:
            raise Http404
    
    def patch(self, request, pk, format=None):
        testcase = self.get_object(pk)
        serializer = TestcaseUpdateSerializer(instance=testcase, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Testcase updated Successfully','data': serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# soft delete single question
class DeleteQuestionAPIView(APIView):
    # renderer_classes = [QuestionRenderer]
    permission_classes = [IsAuthenticated, IsAuthorPermission, IsOwnAuthorPermission]
    message = "You are not Authenticated to access to permission"
    def get_object(self, pk):
        try:
            return Question.everything.get(pk=pk)
        except Question.DoesNotExist:
            raise Http404
        
    def delete(self, request, pk, format=None):
        question = self.get_object(pk)
        self.check_object_permissions(request, question)
        question.soft_delete()
        question.is_updated = True
        question.save()
        return Response({'msg': 'Question Deleted Successfully'}, status=status.HTTP_200_OK)


# restore single question
class RestoreQuestionAPIView(APIView):
    # renderer_classes = [QuestionRenderer]
    permission_classes = [IsAuthenticated, IsAuthorPermission, IsOwnAuthorPermission]
    message = "You are not Authenticated to access to permission"
    def get_object(self, pk):
        try:
            return Question.everything.get(pk=pk)
        except Question.DoesNotExist:
            raise Http404
    
    def put(self, request, pk, format=None):
        question = self.get_object(pk)
        self.check_object_permissions(request, question)
        question.restore()
        question.is_updated = True
        question.save()
        return Response({'msg': 'Question Restored Successfully'}, status=status.HTTP_200_OK)
    

# get no of easy medium hard total question
class GetTotalQuestionAPIView(APIView):
    # renderer_classes = [QuestionRenderer]
    permission_classes = [IsAuthenticated]
    
    def get(self,request, format=None):
        total_question = Question.objects.count()
        easy_question = Question.objects.filter(level='Easy').count()
        medium_question = Question.objects.filter(level='Medium').count()
        hard_question = Question.objects.filter(level='Hard').count()
        data = {
            'Total' : total_question,
            'Easy' : easy_question,
            'Medium' : medium_question,
            'Hard' : hard_question
        }
        return Response({'data':data, 'msg': 'Question Total Calculated'},status=status.HTTP_200_OK)
