import json
from django.urls import reverse


def test_ping(client):
    url = reverse("test")
    response = client.get(url)
    content = json.loads(response.content)
    assert response.status_code == 200
    assert content["test"] == "test!"
