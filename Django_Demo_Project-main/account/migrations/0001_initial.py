# Generated by Django 4.1.6 on 2023-04-25 03:17

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=255, unique=True, verbose_name='Email')),
                ('name', models.CharField(max_length=200)),
                ('mobile', models.CharField(blank=True, default=None, max_length=14, null=True)),
                ('about', models.TextField(blank=True, default=None, max_length=500, null=True)),
                ('user_type', models.CharField(choices=[('Admin', 'admin'), ('Author', 'author'), ('Examiner', 'examiner'), ('Attendee', 'attendee'), ('User', 'user')], default='User', max_length=10)),
                ('image', models.FileField(blank=True, default=None, null=True, upload_to='account_images/')),
                ('password', models.CharField(default=None, max_length=100)),
                ('github_profile', models.TextField(blank=True, default=None, max_length=200, null=True)),
                ('linkedin_profile', models.TextField(blank=True, default=None, max_length=200, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=False)),
                ('is_author', models.BooleanField(default=False)),
                ('is_examiner', models.BooleanField(default=False)),
                ('is_attendee', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
