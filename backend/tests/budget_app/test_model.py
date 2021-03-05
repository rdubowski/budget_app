import pytest
from budget_app.models import Account, Transaction


@pytest.mark.django_db
def test_create_account(create_user):
    user = create_user
    account = Account.objects.create(user=user, name='account1',
                                    description='Random description')
    assert Account.objects.all().count() == 1
    assert Account.objects.filter(name='account1').exists()
    assert Account.objects.get(name='account1').description == 'Random description'
    assert str(Account.objects.get(name='account1')) == 'account1'


@pytest.mark.django_db
def test_create_transatction(create_user):
    user = create_user
    account = Account.objects.create(user=user, name='account1',
                                    description='Random description')
    transaction = Transaction.objects.create(amount=500, name='transaction1',
                                        transaction_type='D', account=account,)
    assert Transaction.objects.all().count() == 1
    assert Transaction.objects.filter(name='transaction1').exists()
    assert str(Transaction.objects.get(name='transaction1')) == 'transaction1-Deposit'
    assert Transaction.objects.get(name='transaction1').transaction_type == 'D'