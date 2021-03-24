from rest_framework import permissions
class IsOwnerTransaction(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        print('----')
        print('----')
        print('----')
        print('----')
        print('----')
        print('----')
        return obj.account.user == request.user

class IsOwnerOfAccount(permissions.BasePermission):
    def has_permission(self, request, view):
        return True
