import datetime

from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.core.mail import send_mail
from django.conf import settings



def get_user_key_info(request,user_key):
    
    return_value = None
    # checking if the user key is in the session
    try:
        return_value = request.session[user_key]
    except:
        print("Error: User not in session")
        
    # if the user key is not in the session, check if the user key is in the request
    # for Get requests
    if return_value == None:
        return_value = request.GET.get(user_key, None)
    # for Post requests
    if return_value == None:
        request_data_parsed = JSONParser().parse(request)
        return_value = request_data_parsed[user_key]

    return return_value
    