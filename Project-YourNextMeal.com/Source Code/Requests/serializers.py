from rest_framework import serializers
from .models import DonationRequest, RequestStatus

class DonationRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = DonationRequest
        DonationPickupDate = serializers.DateField()
        DonationPickupTime = serializers.TimeField()
        DonationPhotoLink = serializers.FileField()
        fields = "__all__"

class RequestStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequestStatus
        RequestCreationDateTime = serializers.DateTimeField()
        RequestAcceptDateTime = serializers.DateTimeField()
        fields = "__all__"
