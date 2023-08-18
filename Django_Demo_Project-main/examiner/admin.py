from django.contrib import admin
from examiner.models import Exam, ExamQuestion

# from import_export.admin import ExportActionMixin

# Register your models here.
class ExamAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'created_by']
    pass

admin.site.register(Exam, ExamAdmin)
admin.site.register(ExamQuestion)