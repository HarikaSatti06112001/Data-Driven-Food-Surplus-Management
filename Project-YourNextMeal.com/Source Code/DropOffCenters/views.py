from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse

from rest_framework.parsers import JSONParser
from rest_framework import status

from .models import DropOffLocations
from .serializers import DropOffLocationsSerializer


@csrf_exempt
def viewDropOffLocations(request):
    if request.body.decode('utf-8') == "":
        centers = DropOffLocations.objects.all()
    else:
        search_parsed = JSONParser().parse(request)
        city = search_parsed['City']
        zipcode = search_parsed['Zipcode']
        centers = DropOffLocations.objects.filter(LocationAddress={'City':city, 'Zipcode':zipcode})

    if centers:
        centers_serialized = DropOffLocationsSerializer(centers, many=True)
        print(centers_serialized.data)
        return JsonResponse(centers_serialized.data, safe=False, status=status.HTTP_200_OK)
    
    return JsonResponse('No dropoff locations found', safe=False, status=status.HTTP_204_NO_CONTENT)


'''
def addDropOffLocations(request):
    request_parsed = JSONParser().parse(request)
    request_serialized = DropOffLocationsSerializer(data=request_parsed)

    if request_serialized.is_valid():
        request_serialized.save()
        return JsonResponse('Added successfully', safe=False)
    return JsonResponse('Error', safe=False)
'''

