from djongo import models
import Utility.models 

class Donor(models.Model):
    Name = models.CharField(max_length=200)
    Address = models.EmbeddedField(
        model_container=Utility.models.Address
        )
    Contact = models.CharField(validators=[Utility.models.regex], max_length=12) 
    Email = models.EmailField(primary_key=True)