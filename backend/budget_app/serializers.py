from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers
from .models import Account, Transaction

class AccountSerializer(serializers.ModelSerializer):
    transactions = serializers.StringRelatedField(many=True)

    class Meta:
        model = Account
        fields = ('user', 'name', 'description',
                 'balance', 'transactions', 'created_at', 'updated_at')


class TransactionSerializer(serializers.ModelSerializer):
    transaction_type = serializers.ChoiceField(Transaction.TRANSACTION_CHOICES)

    class Meta:
        model = Transaction
        fields = ('amount', 'name', 'transaction_type', 'account', 'created_at')