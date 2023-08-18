from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly, BasePermission, IsAdminUser, DjangoModelPermissions

    
class IsOwnUserPermission(BasePermission):
    message = "You do not have permission to perform this action. Not Valid Authenticated User"
    def has_object_permission(self, request, view, obj):
        
        if request.method in SAFE_METHODS:
            return True
        
        return obj.email == request.user.email