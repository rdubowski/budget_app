from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter()
router.register('accounts', views.AccountViewSet)
app_name = 'budget'

urlpatterns = [
    path('', include(router.urls)),
    path('accounts/<int:pk>/transactions/', views.transaction_list_post,
         name='transactions'),
    # path('transactions/<int:pk>/delete/', views.transaction_delete, name="transaction_delete"),
    path('transactions/<int:pk>/', views.transaction_single.as_view(), name="transaction_get"),
    path('transactions/<int:pk>/delete/', views.transaction_delete.as_view(), name="transaction_delete"),
    path('account/<int:id>/transactions/', views.transaction_list.as_view(),
         name='transactionss'),
    #path('accountss/<int:id>/transactions/add/' views.transaction_list.as_view(),
         #name='transactionss'),
]
