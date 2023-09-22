from django.db import models
from django.utils import timezone
import uuid

from account.models import User

TESTCASE_NUMBER = (
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
)

QUESTION_LEVEL_CHOICES = (
    ('Easy', 'easy'),
    ('Medium', 'medium'),
    ('Hard', 'hard'),
)
DEFAULT_LANG = ["JAVASCRIPT_NODE","PYTHON3","PHP","JAVA14","TYPESCRIPT","CPP17","RUBY","C"]

    
class NonDeleted(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted = False).filter(is_private = False)
    
class PublicOnly(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_private = False)
    
class SoftDelete(models.Model):
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(default=None, null=True, blank=True)

    everything = models.Manager()
    objects = NonDeleted()
    publics = PublicOnly()

    def soft_delete(self):
        self.is_deleted = True
        self.deleted_at = timezone.now()
        self.save()
    
    def restore(self):
        self.is_deleted = False
        self.save()
    
    class Meta:
        abstract = True
    
# Create your models here.
class Question(SoftDelete):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    title = models.CharField(max_length=100, default=None)
    description = models.TextField(max_length=5000, default=None, null=True, blank=True)
    example = models.TextField(max_length=500, default=None, null=True, blank=True)
    level = models.CharField(max_length=10, choices=QUESTION_LEVEL_CHOICES, default='Easy')
    python_init_code = models.TextField(max_length=5000, default=None, null=True, blank = True)
    javascript_init_code = models.TextField(max_length=5000, default=None, null=True, blank = True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    exam_language = models.JSONField(default=DEFAULT_LANG)
    is_private = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_updated = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.title} : {self.level} : {self.id} : {self.created_by.name} : {self.is_deleted} : {self.is_updated}'
    
class Testcase(SoftDelete):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, default=None)
    number = models.IntegerField(choices=TESTCASE_NUMBER, default=1)
    input = models.TextField(max_length=500, default=None, blank=True, null=True)
    output = models.TextField(max_length=500, default=None, null=True, blank=True)
    is_private = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_updated = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('question', 'number')
        ordering = ('-question', 'number')

    def __str__(self):
        return f'{self.question.title} : {self.number} : {self.is_active}'
    