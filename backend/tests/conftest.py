import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from budget_app.models import Account, Transaction
import datetime


@pytest.fixture(scope="function")
def today():
    return datetime.date.today()

@pytest.fixture(scope="function")
def api_client():
    return APIClient()


@pytest.fixture(scope="function")
def create_custom_user():
    def _create_user(**params):
        user = get_user_model().objects.create_user(**params)
        return user
    return _create_user


@pytest.fixture(scope="function")
def create_user():
    user = get_user_model().objects.create_user(
        email='email@email.com',
        password='testpass123',
    )
    return user


@pytest.mark.django_db
@pytest.fixture(scope="function")
def create_logged_user(api_client, create_user):
    user = create_user
    api_client.force_authenticate(user=user)
    return user


@pytest.mark.django_db
@pytest.fixture(scope="function")
def create_account(create_user):
    user = create_user
    account = Account.objects.create(user=user, name='account1',
                                     description='Random description')

@pytest.mark.django_db
@pytest.fixture(scope="function")
def create_custom_transaction():
    def _create_trans(**params):
        transaction = Transaction.objects.create(**params)
        return transaction
    return _create_trans
