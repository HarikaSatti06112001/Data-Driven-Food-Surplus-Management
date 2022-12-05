from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse

from rest_framework.parsers import JSONParser
from rest_framework import status

from Donor.models import Donor
from Recipient.models import Recipient
from Donor.serializers import DonorSerializer
from Recipient.serializers import RecipientSerializer
from Login.serializers import DonorLoginCredentialsSerializer, RecipientLoginCredentialsSerializer


@csrf_exempt
def signup(request):
    data_parsed = JSONParser().parse(request)
    signup_data = {k:v for k,v in data_parsed.items() if k!= 'Password'} 
    login_data = {k:v for k,v in data_parsed.items() if k in ['Email', 'Password']}

    if data_parsed['Kind'] == 'donor':
        try:
            Donor.objects.get(Email=data_parsed['Email'])
        except Donor.DoesNotExist:
            signup_serializer = DonorSerializer(data=signup_data)
            login_serializer = DonorLoginCredentialsSerializer(data=login_data)
        else:
            return JsonResponse('User already exists', safe=False, status=status.HTTP_409_CONFLICT)
    else:
        try:
            Recipient.objects.get(Email=data_parsed['Email'])
        except:
            signup_serializer = RecipientSerializer(data=signup_data)
            login_serializer = RecipientLoginCredentialsSerializer(data=login_data)
        else:
            return JsonResponse('User already exists', safe=False, status=status.HTTP_409_CONFLICT)

    if signup_serializer.is_valid():
        signup_serializer.save()
        if login_serializer.is_valid():
            login_serializer.save()
            return JsonResponse('Signup successful', safe=False, status=status.HTTP_200_OK)
    else:
        return JsonResponse('Signup failed', safe=False, status=status.HTTP_401_UNAUTHORIZED)
