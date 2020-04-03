from django.shortcuts import render
from django.views import generic
from .models import Product

# Create your views here.

def ProductIndexView(request):
    query = Product.objects.filter(
        availability=True
    ).order_by('-rating')
    return render(request, 'products/index.html', {'most_rated_products':query})