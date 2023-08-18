from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly, BasePermission, IsAdminUser, DjangoModelPermissions

class IsExaminerPermission(BasePermission):
    message = "You do not have permission to perform this action."
    def has_permission(self, request, view):
        if request.user.is_examiner == True:
            return True
        return False
    
class IsOwnExaminerPermission(BasePermission):
    message = "You do not have permission to perform this action. Not Valid Authenticated User"
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        
        return obj.created_by == request.user