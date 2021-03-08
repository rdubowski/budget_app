import pytest
from budget_app.models import Account, Transaction


@pytest.mark.django_db
def test_create_account(create_user):
    user = create_user
    account = Account.objects.create(user=user, name='account1',
                                     description='Random description')
    assert Account.objects.all().count() == 1
    assert Account.objects.filter(name='account1').exists()
    assert Account.objects.get(
                name='account1').description == 'Random description'
    assert str(Account.objects.get(name='account1')) == 'account1'


@pytest.mark.django_db
def test_create_transatction(create_user):
    user = create_user
    account = Account.objects.create(user=user, name='account1',
                                     description='Random description')
    transaction = Transaction.objects.create(amount=500, name='transaction1',
                                             transaction_type='D',
                                             account=account)
    assert Transaction.objects.all().count() == 1
    assert Transaction.objects.filter(name='transaction1').exists()
    assert str(Transaction.objects.get(
        name='transaction1')) == 'transaction1-Deposit'
    assert Transaction.objects.get(name='transaction1').transaction_type == 'D'


@pytest.mark.django_db
def test_account_sum_functions_pos_and_neg(create_user,
                                           create_custom_transaction):
    user = create_user
    account = Account.objects.create(user=user, name='account1',
                                     description='Random description')
    transaction_payload_1 = {'amount': 1500, 'name': 'transaction1',
                             'transaction_type': 'D', 'account': account}
    transaction_payload_2 = {'amount': 500, 'name': 'transaction2',
                             'transaction_type': 'D', 'account': account}
    transaction_payload_3 = {'amount': 400, 'name': 'transaction3',
                             'transaction_type': 'W', 'account': account}
    transaction_payload_4 = {'amount': 300, 'name': 'transaction4',
                             'transaction_type': 'W', 'account': account}
    transaction_1 = create_custom_transaction(**transaction_payload_1)
    transaction_2 = create_custom_transaction(**transaction_payload_2)
    transaction_3 = create_custom_transaction(**transaction_payload_3)
    transaction_4 = create_custom_transaction(**transaction_payload_4)
    assert account.deposit_sum() == 2000
    assert account.withdraw_sum() == 700
    assert account.actual_balance() == 1300


@pytest.mark.django_db
def test_account_sum_functions_negative_only(create_user,
                                             create_custom_transaction):
    user = create_user
    account = Account.objects.create(user=user, name='account1',
                                     description='Random description')
    transaction_payload_1 = {'amount': 1500.07, 'name': 'transaction1',
                             'transaction_type': 'W', 'account': account}
    transaction_payload_2 = {'amount': 500, 'name': 'transaction2',
                             'transaction_type': 'W', 'account': account}
    transaction_1 = create_custom_transaction(**transaction_payload_1)
    transaction_2 = create_custom_transaction(**transaction_payload_2)
    assert account.deposit_sum() == 0
    assert float(str(account.withdraw_sum())) == 2000.07
    assert float(str(account.actual_balance())) == -2000.07


@pytest.mark.django_db
def test_account_sum_functions_positive_only(create_user,
                                             create_custom_transaction):
    user = create_user
    account = Account.objects.create(user=user, name='account1',
                                     description='Random description')
    transaction_payload_1 = {'amount': 1500.05, 'name': 'transaction1',
                             'transaction_type': 'D', 'account': account}
    transaction_payload_2 = {'amount': 500, 'name': 'transaction2',
                             'transaction_type': 'D', 'account': account}
    transaction_1 = create_custom_transaction(**transaction_payload_1)
    transaction_2 = create_custom_transaction(**transaction_payload_2)
    assert float(str(account.deposit_sum())) == 2000.05
    assert account.withdraw_sum() == 0
    assert float(str(account.actual_balance())) == 2000.05
