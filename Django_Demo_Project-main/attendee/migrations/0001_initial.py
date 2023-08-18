# Generated by Django 4.1.6 on 2023-04-25 03:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.db.models.manager
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('examiner', '0001_initial'),
        ('author', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AttendExam',
            fields=[
                ('is_deleted', models.BooleanField(default=False)),
                ('deleted_at', models.DateTimeField(blank=True, default=None, null=True)),
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('total_cheat', models.IntegerField(default=0)),
                ('total_mark', models.IntegerField(default=0)),
                ('percent_mark', models.IntegerField(default=0)),
                ('start_time', models.DateTimeField(blank=True, default=None, null=True)),
                ('end_time', models.DateTimeField(blank=True, default=None, null=True)),
                ('video', models.FileField(blank=True, default=None, null=True, upload_to='attendee_videos')),
                ('submited_at', models.DateTimeField(blank=True, default=None, null=True)),
                ('is_submited', models.BooleanField(default=False)),
                ('is_qualified', models.BooleanField(blank=True, default=False, null=True)),
                ('is_active', models.BooleanField(default=False)),
                ('is_updated', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('attendee', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('exam', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='examiner.exam')),
            ],
            options={
                'abstract': False,
            },
            managers=[
                ('everything', django.db.models.manager.Manager()),
            ],
        ),
        migrations.CreateModel(
            name='AttendQuestion',
            fields=[
                ('is_deleted', models.BooleanField(default=False)),
                ('deleted_at', models.DateTimeField(blank=True, default=None, null=True)),
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('number', models.IntegerField(choices=[(1, 1), (2, 2), (3, 3)], default=1)),
                ('language', models.CharField(choices=[('JAVASCRIPT_NODE', 'JAVASCRIPT_NODE'), ('PYTHON', 'PYTHON')], default='PYTHON', max_length=20)),
                ('answer', models.TextField(blank=True, default=None, max_length=2000, null=True)),
                ('answer_recorded_at', models.DateTimeField(blank=True, default=None, null=True)),
                ('total_passed_testcase', models.IntegerField(blank=True, default=0, null=True)),
                ('total_mark', models.IntegerField(blank=True, default=0, null=True)),
                ('percent_mark', models.IntegerField(blank=True, default=0, null=True)),
                ('submited_at', models.DateTimeField(blank=True, default=None, null=True)),
                ('is_submited', models.BooleanField(default=False)),
                ('is_atended', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=False)),
                ('is_updated', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('attend_exam', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='attendee.attendexam')),
                ('question', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='author.question')),
            ],
            options={
                'abstract': False,
            },
            managers=[
                ('everything', django.db.models.manager.Manager()),
            ],
        ),
    ]
