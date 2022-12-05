import datetime

from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.core.mail import send_mail
from django.conf import settings

from rest_framework import status
from Utility.views import get_user_key_info

from .models import RequestStatus, DonationRequest
from Recipient.models import Recipient

from .serializers import DonationRequestSerializer, RequestStatusSerializer
from Recipient.serializers import RecipientSerializer


# @csrf_exempt
# def createDonationRquest(request):
#     request_data_parsed = JSONParser().parse(request)
#     request_serializer = DonationRequestSerializer(data=request_data_parsed)

#     if request_serializer.is_valid():
#         request_serializer.save()

#         latest_created_request = DonationRequest.objects.latest('RequestId')
#         RequestStatus.objects.create(RequestId=latest_created_request.RequestId, RequestCreatedBy=request.session['username'], \
#                 RequestCreationDateTime=datetime.datetime.now())
#         return JsonResponse('Donation request created!', safe=False, status=status.HTTP_200_OK)

#     return JsonResponse('Error in creating donation request', safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt
def createDonationRquest(request):
    request_data_parsed = JSONParser().parse(request)
    username = request_data_parsed['username']
    donation_request_data_parsed= {k:v for k,v in request_data_parsed.items() if k!= 'username'} 
    
    request_serializer = DonationRequestSerializer(data=donation_request_data_parsed)

    if request_serializer.is_valid():
        request_serializer.save()

        latest_created_request = DonationRequest.objects.latest('RequestId')
        RequestStatus.objects.create(RequestId=latest_created_request.RequestId, RequestCreatedBy=username, \
                RequestCreationDateTime=datetime.datetime.now())
        return JsonResponse('Donation request created!', safe=False, status=status.HTTP_200_OK)

    return JsonResponse('Error in creating donation request', safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
def updateDonationRquest(request):
    donation_request_updates_parsed = JSONParser().parse(request)
    req = RequestStatus.objects.get(RequestId=donation_request_updates_parsed['RequestId'])

    req.RequestCurrentStatus = 'Active'
    req.save(update_fields=['RequestCurrentStatus'])

    return JsonResponse('Donation request revived', safe=False, status=status.HTTP_200_OK)


@csrf_exempt
def viewCurrentRequests(request):
    user_requests = RequestStatus.objects.filter(RequestCreatedBy=get_user_key_info(request,'username'))

    if user_requests:
        user_requests_serializer = RequestStatusSerializer(user_requests, many=True)

        l = len(user_requests_serializer.data)
        res = []
        for i in range(l):
            request_id = user_requests_serializer.data[i]['RequestId']

            donor_requests_accepted = DonationRequestSerializer(DonationRequest.objects.get(RequestId=request_id)).data

            donor_requests_accepted['RequestCreationDateTime'] = user_requests_serializer.data[i]['RequestCreationDateTime']
            donor_requests_accepted['RequestAcceptedBy'] = user_requests_serializer.data[i]['RequestAcceptedBy']
            donor_requests_accepted['RequestAcceptDateTime'] = user_requests_serializer.data[i]['RequestAcceptDateTime']
            donor_requests_accepted['RequestCurrentStatus'] = user_requests_serializer.data[i]['RequestCurrentStatus']

            res.append(donor_requests_accepted)
        
        return JsonResponse(res, safe=False)
    
    return JsonResponse('No requests found', safe=False, status=status.HTTP_204_NO_CONTENT)


@csrf_exempt
def cancelDonationRequest(request):
    request_parsed = JSONParser().parse(request)
    request_id = request_parsed['RequestId']

    request_status_update = RequestStatus.objects.get(RequestId=request_id)
    request_status_update_serializer = RequestStatusSerializer(request_status_update).data

    if request_status_update_serializer['RequestAcceptedBy']:
        return JsonResponse('Donation request already accepted. Cannot be canceled now', safe=False, status=status.HTTP_304_NOT_MODIFIED)
    else:
        request_status_update.RequestCurrentStatus = 'Cancelled'
        request_status_update.save(update_fields=['RequestCurrentStatus'])

        return JsonResponse('Donation request canceled', safe=False, status=status.HTTP_200_OK)

    
@csrf_exempt
def viewActiveRequests(request):
    active_requests = RequestStatus.objects.filter(RequestCurrentStatus='Active')

    if active_requests:
        active_requests_serializer = RequestStatusSerializer(active_requests, many=True)

        l = len(active_requests_serializer.data)
        active_request_id_list = []
        for i in range(l):
            active_request_id_list.append(active_requests_serializer.data[i]['RequestId'])

        requests_to_display = DonationRequest.objects.filter(RequestId__in=active_request_id_list)
        if requests_to_display:
            requests_to_display_serializer = DonationRequestSerializer(requests_to_display, many=True)
            return JsonResponse(requests_to_display_serializer.data, safe=False)
        
    return JsonResponse('No active requests found', safe=False, status=status.HTTP_204_NO_CONTENT)


@csrf_exempt
def acceptDonationRequest(request):
    request_parsed = JSONParser().parse(request)
    request_id = request_parsed['RequestId']
    username = request_parsed['username']

    request_status_update = RequestStatus.objects.get(RequestId=request_id)
    request_status_update_serialized = RequestStatusSerializer(request_status_update).data

    request_status_update.RequestAcceptedBy = username
    request_status_update.RequestAcceptDateTime = datetime.datetime.now()
    request_status_update.RequestCurrentStatus = 'Accepted'
    request_status_update.save(update_fields=['RequestAcceptedBy', 'RequestAcceptDateTime', 'RequestCurrentStatus'])

    donor_email = request_status_update_serialized['RequestCreatedBy']

    recipient = Recipient.objects.get(Email=username)
    recipient_serialized = RecipientSerializer(recipient).data
    recipient_name = recipient_serialized['Name']
    recipient_contact = recipient_serialized['Contact']

    subject = 'YourNextMeal.com : Donation Request Accepted!'
    message = 'Hurray! You are on your way to help someone in need. Your donation request has been accepted by ' + recipient_name + \
            '. You can reach them on ' + recipient_contact + '. Happy donating!'

    send_mail(
        subject,
        message,
        settings.EMAIL_HOST_USER,
        [donor_email]
    )

    return JsonResponse('Donation request accepted!', safe=False, status=status.HTTP_200_OK)


@csrf_exempt
def viewAcceptedDonations(request):
    user_requests = RequestStatus.objects.filter(RequestAcceptedBy=get_user_key_info(request, 'username'), RequestCurrentStatus='Accepted')

    if user_requests:
        user_requests_serializer = RequestStatusSerializer(user_requests, many=True)

        l = len(user_requests_serializer.data)
        res = []
        for i in range(l):
            request_id = user_requests_serializer.data[i]['RequestId']

            donor_requests_accepted = DonationRequestSerializer(DonationRequest.objects.get(RequestId=request_id)).data

            donor_requests_accepted['RequestCreationDateTime'] = user_requests_serializer.data[i]['RequestCreationDateTime']
            donor_requests_accepted['RequestAcceptedBy'] = user_requests_serializer.data[i]['RequestAcceptedBy']
            donor_requests_accepted['RequestAcceptDateTime'] = user_requests_serializer.data[i]['RequestAcceptDateTime']
            donor_requests_accepted['RequestCurrentStatus'] = user_requests_serializer.data[i]['RequestCurrentStatus']

            res.append(donor_requests_accepted)
        
        return JsonResponse(res, safe=False)
    
    return JsonResponse('No active donations found', safe=False, status=status.HTTP_204_NO_CONTENT)


@csrf_exempt
def cancelAcceptedRequest(request):
    request_parsed = JSONParser().parse(request)
    request_id = request_parsed['RequestId']

    request_status_update = RequestStatus.objects.get(RequestId=request_id)
    request_status_update_serialized = RequestStatusSerializer(request_status_update).data
    donor_email = request_status_update_serialized['RequestCreatedBy']

    current_date_time = datetime.datetime.now().replace(microsecond=0)
    accept_date_time = request_status_update_serialized['RequestAcceptDateTime']
    date = accept_date_time[:10]
    time = accept_date_time[11:19]

    accept_date_time = datetime.datetime.strptime(date+' '+time, '%Y-%m-%d %H:%M:%S')

    if (accept_date_time - current_date_time).total_seconds()/60 <= 20:
        request_status_update.RequestAcceptedBy = None
        request_status_update.RequestAcceptDateTime = None
        request_status_update.RequestCurrentStatus = 'Active'
        request_status_update.save(update_fields=['RequestCurrentStatus'])

        subject = 'YourNextMeal.com : Donation Request Cancelled :('
        message = 'We regret to inform you that your donation request was cancelled by the recipient. We hope you find another recipient. Happy donating!'

        send_mail(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            [donor_email]
        )

        return JsonResponse('Donation request cancelled', safe=False, status=status.HTTP_200_OK)
        
    return JsonResponse('Request accepted more than 20 min ago. Cannot be canceled now', safe=False, status=status.HTTP_304_NOT_MODIFIED)