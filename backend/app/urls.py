from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView
urlpatterns = [
    path("admin/", admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html')),
    path("api/", include("budget_app.urls")),
    path("api/user/", include("user.urls")),
]
