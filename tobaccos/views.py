from django.shortcuts import render
from django.views import generic
from .models import Product, Mix

# Create your views here.

def ProductIndexView(request):
    query = Product.objects.filter(
        availability=True
    ).order_by('-price')
    return render(request, 'products/index.html', {'most_rated_products':query})

def MixIndexView(request):
    query = Mix.objects.all()
    return render(request, 'mixes/index.html', {'mixes_list':query})

def create_mix(request):
    return render(request, 'mixes/create_mix.html')