from django.db import models

# Create your models here.

class Tobacco(models.Model):
    id = models.IntegerField(default=0, unique=True, primary_key=True)
    brand = models.CharField(max_length=100)
    favour = models.CharField(max_length=100)
    favour_type = models.CharField(max_length=50)