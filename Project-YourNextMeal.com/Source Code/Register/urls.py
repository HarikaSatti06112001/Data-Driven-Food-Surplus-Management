from django.urls import re_path
from Register import views

urlpatterns = [
    re_path(r'^signup',views.signup)
]