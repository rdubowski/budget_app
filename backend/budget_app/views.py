from rest_framework import viewsets, mixins
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.generics import ListAPIView
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


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated,])
@authentication_classes([TokenAuthentication,])
def transactions(request, pk=None):
    account = Account.objects.get(pk=pk)
    if request.user == account.user:
        if request.method == 'POST':
            data = request.data
            user = Transaction.objects.create(
            amount=data['amount'], 
            name=data['name'],
            transaction_type=data['transaction_type'], 
            account=account,
                )
            serializer = TransactionSerializer(user, many=False)
            return Response(serializer.data)
        transactions = Transaction.objects.filter(account=pk)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)
    message = {'detail': 'You are unauthorized to reach this account'}
    return Response(message, status=status.HTTP_401_UNAUTHORIZED)
