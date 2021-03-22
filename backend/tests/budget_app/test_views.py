import pytest
from django.contrib.auth import get_user_model
from django.urls import reverse
from budget_app.models import Account, Transaction
from budget_app.serializers import AccountSerializer, TransactionSerializer


pytestmark = pytest.mark.django_db

ACCOUNTS_URL = reverse('budget:account-list')



def test_login_required(api_client):
    resp = api_client.get(ACCOUNTS_URL)
    assert resp.status_code == 401



def test_retrieve_accounts(api_client, create_logged_user):
    user = create_logged_user
    account1 = Account.objects.create(user=user, name='account1',
                                      description='Random description1')
    account2 = account = Account.objects.create(user=user, name='account2',
                                                description='Random des2')
    resp = api_client.get(ACCOUNTS_URL)
    accounts = Account.objects.all().order_by('-updated_at')
    serializer = AccountSerializer(accounts, many=True)
    assert resp.status_code == 200
    assert resp.data == serializer.data



def test_account_limited_to_user(api_client, create_logged_user):
    user_logged = create_logged_user
    user_not_logged = get_user_model().objects.create_user(
        'othermail@vp.pl',
        'otherpass'
    )
    Account.objects.create(user=user_not_logged, name='account1',
                           description='Random description1')
    account_for_logged = Account.objects.create(user=user_logged,
                                                name='account2',
                                                description='Randomdes2')
    resp = api_client.get(ACCOUNTS_URL)
    assert resp.status_code == 200
    assert len(resp.data) == 1
    assert resp.data[0]['user'] == user_logged.id



def test_create_account_successful(api_client, create_logged_user):
    user = create_logged_user
    payload = {'name': 'account1', 'description': 'Random description1'}
    api_client.post(ACCOUNTS_URL, payload)
    exists = Account.objects.filter(
        user=user,
        name=payload['name']
    ).exists()
    assert exists



def test_create_account_invalid(api_client, create_logged_user):
    payload = {'name': ''}
    resp = api_client.post(ACCOUNTS_URL, payload)

    assert resp.status_code == 400



def test_retrieve_account(api_client, create_logged_user):
    payload = {'name': 'account1', 'description': 'Random description1'}
    api_client.post(ACCOUNTS_URL, payload)
    account_id = Account.objects.get(
        name=payload['name']
    ).id
    single_account_url = reverse('budget:account-detail', args=(account_id,))
    resp = api_client.get(single_account_url)
    assert resp.status_code == 200
    assert payload['name'] == resp.data['name']



def test_retrieve_account_invalid_id(api_client, create_logged_user):
    payload = {'name': 'account1', 'description': 'Random description1'}
    api_client.post(ACCOUNTS_URL, payload)
    single_account_url = reverse('budget:account-detail', args=(555,))
    resp = api_client.get(single_account_url)
    assert resp.status_code == 404



def test_delete_account_not_logged(api_client, create_logged_user):
    user = create_logged_user
    payload = {'name': 'account1', 'description': 'Random description1'}
    api_client.post(ACCOUNTS_URL, payload)
    account_id = Account.objects.get(
        name=payload['name']
    ).id
    api_client.force_authenticate(user=None)
    single_account_url = reverse('budget:account-detail', args=(account_id,))
    resp = api_client.delete(single_account_url)
    assert resp.status_code == 401



def test_delete_account(api_client, create_logged_user):
    payload = {'name': 'account1', 'description': 'Random description1'}
    api_client.post(ACCOUNTS_URL, payload)
    account_id = Account.objects.get(
        name=payload['name']
    ).id
    single_account_url = reverse('budget:account-detail', args=(account_id,))
    resp = api_client.delete(single_account_url)
    assert resp.status_code == 204



def test_delete_account_invalid_id(api_client, create_logged_user):
    payload = {'name': 'account1', 'description': 'Random description1'}
    api_client.delete(ACCOUNTS_URL, payload)
    single_account_url = reverse('budget:account-detail', args=(555,))
    resp = api_client.get(single_account_url)
    assert resp.status_code == 404



def test_partial_update_account(api_client, create_logged_user):
    user = create_logged_user
    account = Account.objects.create(user=user, name='account1',
                                     description='Random description')
    payload = {'name': 'Changedname'}
    single_account_url = reverse('budget:account-detail', args=(account.id,))
    api_client.patch(single_account_url, payload)

    account.refresh_from_db()
    assert account.name == payload['name']



def test_full_update_account(api_client, create_logged_user):
    user = create_logged_user
    account = Account.objects.create(user=user, name='account1',
                                     description='Random description')
    payload = {'name': 'accountUpdated',
               'description': 'descriptionupdated'}
    single_account_url = reverse('budget:account-detail', args=(account.id,))
    api_client.put(single_account_url, payload)

    account.refresh_from_db()
    assert account.name == payload['name']
    assert account.description == payload['description']



def test_list_transactions_not_logged(api_client, create_account):
    account = create_account
    list_transactions_url = reverse('budget:transactions', args=(account.id,))
    resp = api_client.get(list_transactions_url)
    assert resp.status_code == 401



def test_list_transactions_for_single_account(api_client,
                                              create_logged_user, 
                                              create_account,
                                              create_custom_transaction):
    """Show list of transactions for logged user and his account """
    user = create_logged_user
    account = create_account
    transaction_payload_1 = {'amount': 1500, 'name': 'transaction1',
                             'transaction_type': 'D', 'account': account}
    transaction_payload_2 = {'amount': 500, 'name': 'transaction2',
                             'transaction_type': 'D', 'account': account}
    transaction_1 = create_custom_transaction(**transaction_payload_1)
    transaction_2 = create_custom_transaction(**transaction_payload_2)
    transactions = Transaction.objects.filter(account=account.pk)
    serializer = TransactionSerializer(transactions, many=True)
    list_transactions_url = reverse('budget:transactions', args=(account.id,))
    resp = api_client.get(list_transactions_url)
    assert resp.status_code == 200
    assert resp.data == serializer.data 



def test_list_transactions_seperate_accounts(api_client,
                                             create_logged_user,
                                             create_account,
                                             create_custom_transaction):
    """Show list of transactions for logged user and his account """
    user = create_logged_user
    account = create_account
    account_2 = Account.objects.create(user=user, name='account_2',
                                       description='Random description')
    transaction_payload = {'amount': 1500, 'name': 'transaction1',
                           'transaction_type': 'D', 'account': account}
    transaction_payload_diff_acc = {'amount': 500, 'name': 'transaction2',
                                    'transaction_type': 'D',
                                    'account': account_2}
    transaction_1 = create_custom_transaction(**transaction_payload)
    transaction_2 = create_custom_transaction(**transaction_payload_diff_acc)
    transactions = Transaction.objects.filter(account=account.pk)
    serializer = TransactionSerializer(transactions, many=True)
    list_transactions_url = reverse('budget:transactions', args=(account.id,))
    resp = api_client.get(list_transactions_url)
    assert resp.status_code == 200
    assert resp.data == serializer.data



def test_create_transaction_successful(api_client,
                                       create_logged_user,
                                       create_account):
    user = create_logged_user
    account = create_account
    payload = {
               "amount": "1133.00",
               "name": "po",
               "transaction_type": "W"
    }
    list_transactions_url = reverse('budget:transactions', args=(account.id,))
    resp = api_client.post(list_transactions_url, payload)
    exists = Transaction.objects.filter(
        account=account,
        name=payload['name']
    ).exists()
    assert exists
