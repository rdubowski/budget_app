import pytest
from django.urls import reverse
from django.contrib.auth import get_user_model


CREATE_CUSTOM_USER_URL = reverse('user:create')
TOKEN_URL = reverse('user:token')
PROFILE_URL = reverse('user:profile')


@pytest.mark.django_db
def test_api_create_custom_user(client, create_custom_user):
    payload = {
        'email': 'email@email.com',
        'password': 'pa34243',
        'name': 'Test name'
    }
    resp = client.post(CREATE_CUSTOM_USER_URL, payload)
    assert resp.status_code == 201
    user = get_user_model().objects.get(**resp.data)
    assert user.check_password(payload['password'])
    assert 'password' not in resp.data


@pytest.mark.django_db
def test_user_exists(client, create_custom_user):
    payload = {
        'email': 'email@email.com',
        'password': 'password123',
        'name': 'Test name'
    }
    create_custom_user(**payload)
    resp = client.post(CREATE_CUSTOM_USER_URL, payload)
    assert resp.status_code == 400


@pytest.mark.django_db
def test_password_too_short(client, create_custom_user):
    payload = {
        'email': 'email@email.com',
        'password': '23',
        'name': 'Testname'
    }
    resp = client.post(CREATE_CUSTOM_USER_URL, payload)
    assert resp.status_code == 400
    test_user_exists = get_user_model().objects.filter(
        email=payload['email']).exists()
    assert not test_user_exists


@pytest.mark.django_db
def test_create_token_for_user(client, create_custom_user):
    payload = {
        'email': 'email@email.com',
        'password': 'testpassword123',
        'name': 'Test name'
    }
    create_custom_user(**payload)
    resp = client.post(TOKEN_URL, payload)
    assert 'token' in resp.data
    assert resp.status_code == 200


@pytest.mark.django_db
def test_create_token_invalid_credentials(client, create_custom_user):
    payload = {
        'email': 'email@email.com',
        'password': 'testpassword123',
        'name': 'Test name'
    }
    payload_with_wrong_pass = {
        'email': 'email@email.com',
        'password': 'wrongpass',
        'name': 'Test name'
    }
    create_custom_user(**payload)
    resp = client.post(TOKEN_URL, payload_with_wrong_pass)
    assert 'token' not in resp.data
    assert resp.status_code == 400


@pytest.mark.django_db
def test_create_token_no_user(client):
    payload = {
        'email': 'email@email.com',
        'password': 'testpassword123',
        'name': 'Test name'
    }
    resp = client.post(TOKEN_URL, payload)
    assert 'token' not in resp.data
    assert resp.status_code == 400


@pytest.mark.django_db
def create_token_missing_field(client, create):
    payload = {
        'email': 'email@email.com',
        'password': '',
        'name': 'Test name'
    }
    resp = client.post(TOKEN_URL, payload)
    assert 'token' not in resp.data
    assert resp.status_code == 400


@pytest.mark.django_db
def test_retrieve_user_unauthorized(client):
    resp = client.get(PROFILE_URL)
    assert resp.status_code == 401


@pytest.mark.django_db
def test_retrieve_profile_success(create_logged_user, api_client):
    user = create_logged_user
    resp = api_client.get(PROFILE_URL)
    assert resp.status_code == 200
    assert resp.data == {
        'name': user.name,
        'email': user.email
    }


@pytest.mark.django_db
def test_post_me_not_allowed(create_logged_user, api_client):
    resp = api_client.post(PROFILE_URL, {})
    assert resp.status_code == 405


@pytest.mark.django_db
def test_update_user_profile(create_logged_user, api_client):
    user = create_logged_user
    payload = {'name': 'new name', 'password': 'new_password123'}
    resp = api_client.patch(PROFILE_URL, payload)
    user.refresh_from_db()
    assert user.name == payload['name']
    assert user.check_password(payload['password'])
    assert resp.status_code == 200
