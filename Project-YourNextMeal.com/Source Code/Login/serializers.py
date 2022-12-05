from rest_framework import serializers
from .models import DonorLoginCredentials, RecipientLoginCredentials 

class DonorLoginCredentialsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DonorLoginCredentials
        fields = "__all__"


class RecipientLoginCredentialsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipientLoginCredentials
        fields = "__all__"