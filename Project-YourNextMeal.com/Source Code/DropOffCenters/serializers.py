from rest_framework import serializers
from .models import DropOffLocations
        
class DropOffLocationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DropOffLocations
        fields = "__all__"

