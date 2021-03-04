from django.http import JsonResponse


def test(request):
    data = {"test": "test!"}
    return JsonResponse(data)
