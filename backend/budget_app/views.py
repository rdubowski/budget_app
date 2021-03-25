from rest_framework import mixins, status, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import DestroyAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Account, Transaction
from .permissions import IsOwnerTransaction
from .serializers import AccountSerializer, TransactionSerializer


class AccountViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
    mixins.UpdateModelMixin,
):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user).order_by(
            "-updated_at"
        )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)


class transaction_delete(DestroyAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, IsOwnerTransaction)
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


class transaction_list(ListCreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = TransactionSerializer
    queryset = Transaction.objects.all()

    def list(self, request, *args, **kwargs):
        account_id = self.kwargs["id"]
        account = Account.objects.get(pk=account_id)
        if request.user == account.user:
            queryset = self.queryset.filter(account=account_id).order_by(
                "-created_at"
            )[:10]
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        else:
            message = {"detail": "You are unauthorized to reach this account"}
            return Response(message, status=status.HTTP_401_UNAUTHORIZED)

    def create(self, request, *args, **kwargs):
        account_id = self.kwargs["id"]
        account = Account.objects.get(pk=account_id)
        if request.user == account.user:
            data = request.data
            if float(data["amount"]) <= 0:
                content = {"detail": "Amount have to be greater than 0"}
                return Response(content, status=status.HTTP_400_BAD_REQUEST)
            data["account"] = account_id
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
                headers=headers,
            )
        else:
            message = {
                "detail": "You are unauthorized to send transaction on this account"
            }
            return Response(message, status=status.HTTP_401_UNAUTHORIZED)
