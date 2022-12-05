from django.urls import re_path
from DropOffCenters import views

urlpatterns = [
    re_path(r'^centers', views.viewDropOffLocations),
]