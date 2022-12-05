from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse

from rest_framework.parsers import JSONParser
from rest_framework import status

from .models import DonorLoginCredentials, RecipientLoginCredentials

def createSession(request, email, usertype):
    request.session['username'] = email
    request.session['usertype'] = usertype

@csrf_exempt
def logout(request):
    request.session.flush()
    return JsonResponse('User logged out!', safe=False)


@csrf_exempt
def login(request):
    login_data_parsed = JSONParser().parse(request)
    kind = login_data_parsed['Kind']
    email = login_data_parsed['Email']
    pwd = login_data_parsed['Password']
    print(kind, email, pwd)

    if login_data_parsed['Kind'] == 'donor':
        try:
            user = DonorLoginCredentials.objects.get(Email=email)
        except DonorLoginCredentials.DoesNotExist:
            return JsonResponse('User not found', safe=False, status=status.HTTP_404_NOT_FOUND)
    else:
        try:
            user = RecipientLoginCredentials.objects.get(Email=email)
        except RecipientLoginCredentials.DoesNotExist:
            return JsonResponse('User not found', safe=False, status=status.HTTP_404_NOT_FOUND)
        
    if pwd == user.Password:
        createSession(request, email, kind)
        return JsonResponse('Login successful', safe=False, status=status.HTTP_200_OK)
    else:
        return JsonResponse('Incorrect password', safe=False, status=status.HTTP_401_UNAUTHORIZED)


@csrf_exempt
def resetPassword(request):
    reset_data_parsed = JSONParser().parse(request)
    email = reset_data_parsed['Email']
    pwd = reset_data_parsed['Password']
    reenter_pwd = reset_data_parsed['Reenter_Password']

    if reset_data_parsed['Kind'] == 'donor':
        try:
            user = DonorLoginCredentials.objects.get(Email=email)
        except DonorLoginCredentials.DoesNotExist:
            return JsonResponse('User not found', safe=False, status=status.HTTP_404_NOT_FOUND)
    else:
        try:
            user = RecipientLoginCredentials.objects.get(Email=email)
        except RecipientLoginCredentials.DoesNotExist:
            return JsonResponse('User not found', safe=False, status=status.HTTP_404_NOT_FOUND)

    if pwd == reenter_pwd:
        user.Password = pwd
        user.save(update_fields=['Password'])
        return JsonResponse('Password reset successful', safe=False, status=status.HTTP_200_OK)
    else:
        return JsonResponse('Passwords do not match', safe=False, status=status.HTTP_401_UNAUTHORIZED)


