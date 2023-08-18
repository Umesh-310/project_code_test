from rest_framework.permissions import SAFE_METHODS, BasePermission

class IsAttendeePermission(BasePermission):
    message = "You do not have permission to perform this action."
    def has_permission(self, request, view):
        if request.user.is_attendee == True:
            return True
        return False
    
class IsOwnAttendeePermission(BasePermission):
    message = "You do not have permission to perform this action. Not Valid Authenticated User"
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        
        return obj.attendee == request.user
    
 
class IsOwnAttendQuestionAttendeePermission(BasePermission):
    message = "You do not have permission to perform this action. Not Valid Authenticated User"
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        
        return obj.attend_exam.attendee == request.user