from django.db import models

# Create your models here.

class Tobacco(models.Model):
    id = models.IntegerField(default=0, unique=True, primary_key=True)
    brand = models.CharField(max_length=100)
    favour = models.CharField(max_length=100)
    favour_type = models.CharField(max_length=50)
    rating = models.DecimalField(max_digits=2, decimal_places=1) # 5.0, 2.5, 4.2 etc.

    def __str__(self):
        return "{0} {1}".format(self.brand, self.favour)

class Product(models.Model):
    tobacco = models.ForeignKey(Tobacco, on_delete=models.CASCADE)
    photo_id = models.IntegerField(default=0)
    mass = models.IntegerField(default=0)
    price = models.IntegerField(default=0)
    availability = models.BooleanField()

    def __str__(self):
        return "{0} {1} ({2}g)".format(self.tobacco.brand, self.tobacco.favour, str(self.mass))


class Mix(models.Model):
    structure = models.IntegerField(default=0)
    author_name = models.CharField(max_length=100)
    author_link = models.CharField(max_length=200)
    description = models.TextField('stuff')
    rating = models.DecimalField(max_digits=2, decimal_places=1)

    def __str__(self):
        return str(self.structure)
