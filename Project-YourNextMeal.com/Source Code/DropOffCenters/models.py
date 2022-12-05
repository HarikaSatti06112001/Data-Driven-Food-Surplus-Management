from djongo import models
import Utility.models

class DropOffLocations(models.Model):
    LocationName = models.CharField(max_length=200)
    LocationAddress = models.EmbeddedField(
        model_container=Utility.models.Address
        )
    LocationContact = models.CharField(validators=[Utility.models.regex], max_length=12, blank=True)
    LocationHours = models.TextField()

