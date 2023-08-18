from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser
from django.contrib.auth.models import Group
import uuid

USER_TYPE_CHOICES = (
    ('Admin', 'admin'),
    ('Author', 'author'),
    ('Examiner', 'examiner'),
    ('Attendee', 'attendee'),
    ('User', 'user'),
)

#  Custom User Manager
class UserManager(BaseUserManager):
    def create_user(self, email, name=None, user_type='User', password='123', password2='123'):
        """
        Creates and saves a User with the given email, name, mobile, about, user_type and password.
        """
        if not email:
            raise ValueError('User must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            user_type=user_type,
        )

        user.set_password(password)
        # user.set_name(name)
        user.is_examiner = True
        user.is_author = True

        user.save(using=self._db)
        return user
    
    def update_or_create_user(self, email2, name=None, user_type='User', password='123'):
        """
        Creates and saves a User with the given email, name, mobile, about, user_type and password.
        """
        # email2 = email

        if not email2:
            raise ValueError('User must have an email address')

        already_user = User.objects.filter(email = email2).all()
        
        if not already_user:
            user = self.model(
                email=self.normalize_email(email2),
                name=name,
                user_type=user_type,
                is_attendee = True,
            )

            user.set_password(password)
            # user.set_name(name)
            user.save(using=self._db)
            created = True
        else:
            user = User.objects.filter(email = email2).get()
            if name is not None:
                user.name = name
            else:
                user.name = user.name
            user.is_attendee = True
            user.save(using=self._db)
            
            created = False

        
        return {user:user,created:created}

    def create_superuser(self, email, name, user_type='Admin', password=None):
        """
        Creates and saves a superuser with the given email, name, user_type and password.
        """
        user = self.create_user(
            email,
            password=password,
            name=name,
            user_type='Admin',
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class AdminUserManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(user_type = 'Admin')
    
class AuthorUserManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(user_type = 'Author')
    
class ExaminerUserManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(user_type = 'Examiner')
    
class AttendeeUserManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(user_type = 'Attendee')
    
class UserUserManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(user_type = 'User')
    
#  Custom User Model
class User(AbstractBaseUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    email = models.EmailField(
        verbose_name='Email',
        max_length=255,
        unique=True
    )
    name = models.CharField(max_length=200)
    mobile = models.CharField(max_length=14, blank=True, null=True, default=None)
    about = models.TextField(max_length=500, blank=True, null=True, default=None)
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default='User')
    
    image = models.ImageField(upload_to='account_images/', default=None, null=True, blank=True)
    password = models.CharField(max_length=100, default=None)

    github_profile = models.TextField(max_length=200, blank=True, null=True, default=None)
    linkedin_profile = models.TextField(max_length=200, blank=True, null=True, default=None)
    
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_author = models.BooleanField(default=False)
    is_examiner = models.BooleanField(default=False)
    is_attendee = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()
    admins = AdminUserManager()
    authors = AuthorUserManager()
    examiners = ExaminerUserManager()
    attendees = AttendeeUserManager()
    users = UserUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name','user_type']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
