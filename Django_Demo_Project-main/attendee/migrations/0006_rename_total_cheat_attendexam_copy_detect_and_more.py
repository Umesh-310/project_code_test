# Generated by Django 4.2.1 on 2023-09-06 10:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('attendee', '0005_attendexam_status'),
    ]

    operations = [
        migrations.RenameField(
            model_name='attendexam',
            old_name='total_cheat',
            new_name='copy_detect',
        ),
        migrations.RemoveField(
            model_name='attendquestion',
            name='javascript_code',
        ),
        migrations.RemoveField(
            model_name='attendquestion',
            name='python_code',
        ),
        migrations.AddField(
            model_name='attendexam',
            name='full_screen_leave',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='attendexam',
            name='switched_tab',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='attendexam',
            name='switched_window',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='attendquestion',
            name='language',
            field=models.CharField(choices=[('JAVASCRIPT_NODE', 'JAVASCRIPT_NODE'), ('PYTHON3', 'PYTHON3'), ('PHP', 'PHP'), ('JAVA14', 'JAVA14')], default='PYTHON3', max_length=20),
        ),
    ]