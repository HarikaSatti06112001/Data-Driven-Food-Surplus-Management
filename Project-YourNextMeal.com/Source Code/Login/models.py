from djongo import models

class DonorLoginCredentials(models.Model):
    Email = models.ForeignKey(
        'Donor.Donor', on_delete=models.CASCADE
        )
    Password = models.CharField(max_length=30)


class RecipientLoginCredentials(models.Model):
    Email = models.ForeignKey(
        'Recipient.Recipient', on_delete=models.CASCADE
        )
    Password = models.CharField(max_length=30)