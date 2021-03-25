from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("budget_app.urls")),
    path("api/user/", include("user.urls")),
]
