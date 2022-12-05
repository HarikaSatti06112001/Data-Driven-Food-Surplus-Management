from django.urls import re_path
from Requests import views

urlpatterns = [
    re_path(r'^createdonationrequest', views.createDonationRquest),
    re_path(r'^updatedonationrequest', views.updateDonationRquest),
    re_path(r'^viewcurrentrequests', views.viewCurrentRequests),
    re_path(r'^canceldonationrequest', views.cancelDonationRequest),

    re_path(r'^viewactiverequests', views.viewActiveRequests),
    re_path(r'^acceptdonationrequest', views.acceptDonationRequest),
    re_path(r'^viewaccepteddonations', views.viewAcceptedDonations),
    re_path(r'^cancelacceptedrequest', views.cancelAcceptedRequest),
]