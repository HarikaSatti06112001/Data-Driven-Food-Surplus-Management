from djongo import models
from django.core.validators import RegexValidator

regex = RegexValidator(regex=r'^\+?1?\d{10}$')

class Address(models.Model):
    _id = models.ObjectIdField()
    Street1 = models.CharField(max_length=200)
    Street2 = models.CharField(max_length=200, blank=True)
    City = models.CharField(max_length=50)
    State = models.CharField(max_length=50)
    Zipcode = models.CharField(max_length=5)