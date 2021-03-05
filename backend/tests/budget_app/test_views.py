import pytest
from django.contrib.auth import get_user_model
from django.urls import reverse
from budget_app.models import Account, Transaction
from budget_app.serializers import AccountSerializer, TransactionSerializer


ACCOUNT_URL = reverse('budget:account-list')


@pytest.mark.django_db
def test_login_required(api_client):
    resp = api_client.get(ACCOUNT_URL)
    assert resp.status_code == 401


@pytest.mark.django_db
def test_retrieve_accountss(api_client, create_logged_user):
    user = create_logged_user
    account1 = Account.objects.create(user=user, name='account1',
                                      description='Random description1')
    account2 = account = Account.objects.create(user=user, name='account2',
                                     description='Random description2')
    resp = api_client.get(ACCOUNT_URL)
    accounts = Account.objects.all().order_by('-updated_at')
    serializer = AccountSerializer(accounts, many=True)
    assert resp.status_code == 200
    assert resp.data == serializer.data 


@pytest.mark.django_db
def test_tags_limited_to_user(api_client, create_logged_user):
    user_logged = create_logged_user
    user_not_logged = get_user_model().objects.create_user(
        'othermail@vp.pl',
        'otherpass'
    )
    Account.objects.create(user=user_not_logged, name='account1',
                                      description='Random description1')
    account_for_logged = Account.objects.create(user=user_logged, name='account2',
                                     description='Random description2')
    resp = api_client.get(ACCOUNT_URL)
    assert resp.status_code == 200
    assert len(resp.data) == 1
    assert resp.data[0]['user'] == user_logged.id


@pytest.mark.django_db
def test_create_account_successful(api_client, create_logged_user):
        user = create_logged_user
        payload = {'name':'account1', 'description':'Random description1'}
        api_client.post(ACCOUNT_URL, payload)
        exists = Account.objects.filter(
            user=user,
            name=payload['name']
        ).exists()
        assert exists

        
@pytest.mark.django_db
def test_create_account_invalid(api_client, create_logged_user):
    payload = {'name': ''}
    resp = api_client.post(ACCOUNT_URL, payload)

    assert resp.status_code == 400