import pytest
from budget_app.serializers import AccountSerializer, TransactionSerializer


@pytest.mark.django_db
def test_valid_account_serializer(create_user):
    valid_serializer_data = {
        "user": f"{create_user.id}",
        "name": "testacc",
    }
    serializer = AccountSerializer(data=valid_serializer_data)
    assert serializer.is_valid()
    assert serializer.errors == {}


@pytest.mark.django_db
def test_invalid_account_serializer(create_user):
    invalid_serializer_data = {
    }
    serializer = AccountSerializer(data=invalid_serializer_data)
    assert not serializer.is_valid()
    assert serializer.validated_data == {}
    assert serializer.data == invalid_serializer_data
    assert serializer.errors == {"name": ["This field is required."]}


@pytest.mark.django_db
def test_valid_transaction_serializer(create_account):
    valid_serializer_data = {
        "account": f"{create_account.id}",
        "name": "testrans",
        "amount": 50,
        "transaction_type": "D"
    }
    serializer = TransactionSerializer(data=valid_serializer_data)
    assert serializer.is_valid()
    assert serializer.errors == {}


@pytest.mark.django_db
def test_invalid_transaction_serializer(create_account):
    invalid_serializer_data = {}
    serializer = TransactionSerializer(data=invalid_serializer_data)
    assert not serializer.is_valid()
    assert serializer.validated_data == {}
    assert serializer.data == invalid_serializer_data
