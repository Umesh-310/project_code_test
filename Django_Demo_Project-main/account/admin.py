from django.contrib import admin
from account.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Permission, Group

from django.contrib import messages
from django.utils.translation import ngettext

# from import_export.admin import ExportActionMixin


admin.site.unregister(Group)

class UserModelAdmin(BaseUserAdmin):
    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserModelAdmin
    # that reference specific fields on auth.User.
    list_display = ('id', 'email', 'name', 'user_type', 'is_admin', 'is_author', 'is_examiner', 'is_attendee', 'is_active')
    fieldsets = (
        ('User Credentials', {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name', 'mobile', 'about', 'image')}),
        ('Permissions', {'fields': ('user_type', 'is_admin', 'is_author', 'is_examiner', 'is_attendee','is_active')}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserModelAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name',  'mobile', 'about', 'user_type', 'password1', 'password2'),
        }),
    )
    search_fields = ('email', 'name', 'mobile', 'user_type')
    ordering = ('email', 'id', 'name', 'user_type')
    list_filter = ('is_admin', 'is_author', 'is_examiner', 'is_attendee','is_active', 'created_at')
    filter_horizontal = ()
    actions = ['make_activate', 'make_deactivate']

    @admin.action(description='Activate selected Users')
    def make_activate(self, request, queryset):
        updated = queryset.update(is_active=True)
        self.message_user(request, ngettext(
                '%d user was successfully activated.',
                '%d users were successfully activated.',
                updated,
            ) % updated, messages.SUCCESS)

    @admin.action(description='Deactivate selected Users')
    def make_deactivate(self, request, queryset):
        updated = queryset.update(is_active=False)
        self.message_user(request, ngettext(
                '%d user was successfully deactivated.',
                '%d users were successfully deactivated.',
                updated,
            ) % updated, messages.SUCCESS)


# Now register the new UserModelAdmin...
admin.site.register(User, UserModelAdmin)