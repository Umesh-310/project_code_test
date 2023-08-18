from django.contrib import admin

from .models import Question, Testcase
# Register your models here.
admin.site.register(Question)
admin.site.register(Testcase)