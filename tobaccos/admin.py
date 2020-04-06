from django.contrib import admin
from .models import Product, Tobacco, Mix

# Register your models here.

admin.site.register(Product)
admin.site.register(Tobacco)
admin.site.register(Mix)