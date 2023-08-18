from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly, BasePermission, IsAdminUser, DjangoModelPermissions

class IsAuthorPermission(BasePermission):
    message = "You do not have permission to perform this action."
    def has_permission(self, request, view):
        if request.user.is_author == True:
            return True
        return False
    
class IsOwnAuthorPermission(BasePermission):
    message = "You do not have permission to perform this action. Not Valid Authenticated User"
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        
        return obj.created_by == request.user