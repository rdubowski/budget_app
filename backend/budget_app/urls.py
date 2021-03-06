from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter()
router.register('accounts', views.AccountViewSet)
app_name = 'budget'

urlpatterns = [
    path('', include(router.urls)),
    path ('accounts/<int:pk>/transactions/', views.transactions,
     name='transactions'),
]
