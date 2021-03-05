from rest_framework import serializers
from .models import Account, Transaction


class AccountSerializer(serializers.ModelSerializer):
    transactions = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Account
        fields = ('user', 'name', 'description','init_balance',
                  'transactions', 'created_at', 'updated_at',
                  'deposit_sum', 'withdraw_sum', 'actual_balance')
        read_only_fields = ['user', 'created_at', 'updated_at',
                            'deposit_sum', 'withdraw_sum', 'actual_balance']

class TransactionSerializer(serializers.ModelSerializer):
    transaction_type = serializers.ChoiceField(Transaction.TRANSACTION_CHOICES)

    class Meta:
        model = Transaction
        fields = ('amount', 'name', 'transaction_type',
                  'account', 'created_at')
        read_only_fields = ['account']
