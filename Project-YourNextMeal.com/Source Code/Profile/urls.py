from django.urls import re_path
from Profile import views

urlpatterns = [
    re_path(r'^viewprofile', views.getProfile),
    re_path(r'^deleteprofile', views.deleteProfile),
    re_path(r'^updateprofile', views.updateProfile),
]