from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter()
router.register('accounts', views.AccountViewSet)
app_name = 'budget'

urlpatterns = [
    path('', include(router.urls)),
    path('transactions/<int:pk>/delete/', views.transaction_delete.as_view(), name="transaction_delete"),
    path('accounts/<int:id>/transactions/', views.transaction_list.as_view(),
         name='transactions'),
]
