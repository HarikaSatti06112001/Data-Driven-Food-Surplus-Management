from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse

from rest_framework.parsers import JSONParser
from rest_framework import status

from Donor.models import Donor
from Recipient.models import Recipient
from Donor.serializers import DonorSerializer
from Recipient.serializers import RecipientSerializer
from django.shortcuts import render
from Utility.views import get_user_key_info


@csrf_exempt
def index(request):
    return render(request, "build/index.html")

@csrf_exempt
def getProfile(request):

    username = get_user_key_info(request, 'username')
    usertype = get_user_key_info(request, 'usertype')
    print(username)
    print(usertype)
    
    if usertype == 'donor':
        profile = DonorSerializer(Donor.objects.get(Email=username)).data
    else:
        profile = RecipientSerializer(Recipient.objects.get(Email=username)).data
    
    return JsonResponse(profile, safe=False)


@csrf_exempt
def deleteProfile(request):
    
    username = get_user_key_info(request, 'username')
    usertype = get_user_key_info(request, 'usertype')
    
    if usertype == 'donor':
        user = Donor.objects.get(Email=username)
    else:
        user = Recipient.objects.get(Email=username)

    user.delete()

    return JsonResponse('User profile deleted', safe=False, status=status.HTTP_200_OK)


@csrf_exempt
def updateProfile(request):
    user_updates_parsed = JSONParser().parse(request) 
  
    usertype = get_user_key_info(request, 'usertype')
    if usertype == 'donor':
        user = Donor.objects.get(Email=usertype)
        serializer = DonorSerializer(user, data=user_updates_parsed)
    else:
        user = Recipient.objects.get(Email=usertype)
        serializer = RecipientSerializer(user, data=user_updates_parsed)

    if serializer.is_valid():
        serializer.save()
        return JsonResponse('Profile updated', safe=False, status=status.HTTP_200_OK)

    return JsonResponse('Error in profile', safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)