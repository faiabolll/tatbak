from django.db import models

# Create your models here.

"""
As Tobacco model is quite similar to use in each app
it's reasonable to create ONE Tobacco model and then
import her from base app
"""
def get_tobacco_model():
    import os
    import sys
    import inspect
    current_dir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
    parent_dir = os.path.dirname(current_dir)
    sys.path.insert(0, parent_dir)

get_tobacco_model()
from base.models import Tobacco

class Product(models.Model):
    tobacco = models.ForeignKey(Tobacco, on_delete=models.CASCADE)
    photo_id = models.IntegerField(default=0)
    mass = models.IntegerField(default=0)
    price = models.IntegerField(default=0)
    rating = models.DecimalField(max_digits=2, decimal_places=1) # 5.0, 2.5, 4.2 etc.
    availability = models.BooleanField()

    def __str__(self):
        return "{0} {1} ({2}g)".format(self.brand, self.favour, str(self.mass))