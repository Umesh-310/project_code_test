from django.db import models
from account.models import User
from examiner.models import Exam
from author.models import Question
import uuid
from django.utils import timezone

ATTEND_QUESTION_NUMBER = (
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
)

ATTEND_QUESTION_LANGUAGE = (
    ('JAVASCRIPT_NODE', "JAVASCRIPT_NODE"),
    ("PYTHON3", "PYTHON3"),
    ("PHP", "PHP"),
    ("JAVA14", "JAVA14"),
    ("TYPESCRIPT","TYPESCRIPT"),
    ("CPP17","CPP17"),
    ("RUBY","RUBY"),
    ("C","C")
)
# Create your models here.
class NonDeleted(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted = False)
    
class NonActive(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_active = False)
    
class SoftDelete(models.Model):
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(default=None, null=True, blank=True)

    everything = models.Manager()
    objects = NonDeleted()
    non_actives = NonActive()

    def soft_delete(self):
        self.is_deleted = True
        self.deleted_at = timezone.now()
        self.save()
    
    def restore(self):
        self.is_deleted = False
        self.save()
    
    class Meta:
        abstract = True



class AttendExam(SoftDelete):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    attendee = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, default=None, null=True, blank=True)

    # total_cheat = models.IntegerField(default=0) 
    copy_detect = models.IntegerField(default=0) 
    full_screen_leave = models.IntegerField(default=0) 
    switched_tab = models.IntegerField(default=0) 
    switched_window = models.IntegerField(default=0) 
    
    total_mark = models.IntegerField(default=0)
    percent_mark = models.IntegerField(default=0)
    # start_time = models.DateTimeField(auto_now_add=True)
    start_time = models.DateTimeField(default=None, null=True, blank=True)
    
    end_time = models.DateTimeField(default=None, null=True, blank=True)
    video = models.FileField(upload_to='attendee_videos/',default=None, null=True, blank=True)
    submited_at = models.DateTimeField(default=None, null=True, blank=True)
    is_submited = models.BooleanField(default=False)
    is_qualified = models.BooleanField(default=False, null=True, blank=True)

    status = models.CharField(default='In Progress',max_length=20)


    is_active = models.BooleanField(default=False)
    is_updated = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.attendee.email} : {self.exam.id} : {self.is_active}: {self.percent_mark}"
    


class AttendQuestion(SoftDelete):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, default=None, null=True, blank=True)
    attend_exam = models.ForeignKey(AttendExam, on_delete=models.CASCADE, default=None, null=True, blank=True)
    number = models.IntegerField(choices=ATTEND_QUESTION_NUMBER, default=1)

    language = models.CharField(max_length=20, choices=ATTEND_QUESTION_LANGUAGE, default="JAVASCRIPT_NODE")
    answer = models.TextField(max_length=5000, default=None, null=True, blank=True)
    # python_code = models.TextField(max_length=5000, default=None, null=True, blank=True)
    # javascript_code = models.TextField(max_length=5000, default=None, null=True, blank=True)
    answer_recorded_at = models.DateTimeField(default=None, null=True, blank=True)
    code_snippets = models.JSONField(default=None , null=True, blank=True)
    # mark = models.IntegerField(default=0)
    total_passed_testcase = models.IntegerField(default=0, null=True, blank=True)
    total_mark = models.IntegerField(default=0, null=True, blank=True)
    percent_mark = models.IntegerField(default=0, null=True, blank=True)
    submited_at = models.DateTimeField(default=None, null=True, blank=True)
    is_submited = models.BooleanField(default=False)
    
    is_atended = models.BooleanField(default=False)
    

    is_active = models.BooleanField(default=False)
    is_updated = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.question.title} : {self.number} : {self.percent_mark} : {self.is_atended} : {self.id}"
