from rest_framework import viewsets, mixins
from rest_framework.generics import ListCreateAPIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Account, Transaction
from .serializers import AccountSerializer, TransactionSerializer

class AccountViewSet(viewsets.GenericViewSet,
                     mixins.ListModelMixin,
                     mixins.CreateModelMixin,
                     mixins.RetrieveModelMixin,
                     mixins.DestroyModelMixin,
                     mixins.UpdateModelMixin):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user).order_by(
                '-updated_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    def perform_update(self, serializer):
        serializer.save(user=self.request.user)


class TransactionsViewSet(ListCreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


    def list(self, request, pk=None):
        try:
            account = Account.objects.get(pk=pk)
            if self.request.user == account.user:
                queryset = Transaction.objects.filter(account=pk)
                serializer = self.get_serializer(queryset, many=True)
                return Response(serializer.data)
            else:
                message = {'detail': 'You are unauthorized to see this'}
                return Response(message, status=status.HTTP_401_UNAUTHORIZED)
        except:
            message = {'detail': 'This account doesnt exist'}
            return Response(message, status=status.HTTP_404_NOT_FOUND)

    def perform_create(self, serializer):
        try:
            account = Account.objects.get(pk=pk)
            if self.request.user == account.user:
                serializer.save(account=account.id)
            else:
                message = {'detail': 'You are unauthorized to do that'}
                return Response(message, status=status.HTTP_401_UNAUTHORIZED)
        except:
            message = {'detail': 'This account doesnt exist'}
            return Response(message, status=status.HTTP_404_NOT_FOUND)