from django.db import models
from django.utils import timezone

import uuid

from account.models import User
from author.models import Question

DEFAULT_LANG = ["JAVASCRIPT_NODE","PYTHON3","PHP","JAVA14","TYPESCRIPT","CPP17","RUBY","C"]

class NonDeletedDeactivate(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted = False).filter(is_active = True)


class NonDeleted(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted = False)


class SoftDelete(models.Model):
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(default=None, null=True, blank=True)

    everything = models.Manager()
    own_objects = NonDeleted()
    objects = NonDeletedDeactivate()

    def soft_delete(self):
        self.is_deleted = True
        self.deleted_at = timezone.now()
        self.save()
    
    def restore(self):
        self.is_deleted = False
        self.save()
    
    class Meta:
        abstract = True


class Exam(SoftDelete):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, default=None, null=True, blank=True)
    title = models.CharField(max_length=100, default=None)
    description = models.TextField(max_length=200, default=None, null=True, blank=True)
    passing_percent_mark = models.IntegerField(default=0)
    
    start_time = models.DateTimeField(default=None, blank=True, null=True)
    end_time = models.DateTimeField(default=None, blank=True, null=True)
    exam_link = models.TextField(max_length=500, default=None, null=True, blank=True)
    exam_language = models.JSONField(default=DEFAULT_LANG)
    
    is_time_limit = models.BooleanField(default=False)
    is_date_limit = models.BooleanField(default=False)
    time_limit_hour = models.IntegerField(default=0)
    time_limit_minute = models.IntegerField(default=0)
    total_question = models.IntegerField(default=0)
    allow_redo_exam = models.BooleanField(default=False)

    is_active = models.BooleanField(default=True)
    is_updated = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def deactivate(self):
        self.is_active = False
        self.is_updated = True
        self.save()

    def activate(self):
        self.is_active = True
        self.is_updated = True
        self.save()

    def __str__(self):
        return f"{self.title} : {self.created_by.email} : {self.is_deleted} : {self.is_updated} : {self.updated_at}"
    
    
class ExamQuestion(SoftDelete):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, default=None)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, default=None)
    number = models.IntegerField(default=1)

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.id}"