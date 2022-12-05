from djongo import models
import Utility.models

class DonationRequest(models.Model):
    RequestId = models.AutoField(primary_key=True)
    DonationType = models.CharField(max_length=100)
    DonationQty = models.TextField()
    DonationAllergies = models.TextField(blank=True)
    DonationDescription = models.TextField()
    DonationPickupDate = models.DateField()
    DonationPickupTime = models.TimeField()
    DonorContact = models.CharField(validators=[Utility.models.regex], max_length=12, blank=True)
    DonorAddress = models.EmbeddedField(
        model_container=Utility.models.Address
        )
    #DonationPhotoLink = models.FileField(upload_to='media/', blank=True)


class RequestStatus(models.Model):
    RequestId = models.IntegerField(primary_key=True)
    RequestCreatedBy = models.EmailField()
    RequestCreationDateTime = models.DateTimeField(auto_now=True)
    RequestAcceptedBy = models.EmailField(default=None, null=True)
    RequestAcceptDateTime = models.DateTimeField(default=None, null=True)
    RequestCurrentStatus = models.CharField(max_length=20, default='Active')