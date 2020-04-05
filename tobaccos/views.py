from django.shortcuts import render, reverse
from django.views import generic
from django.http import HttpResponseRedirect
from django import forms
from .models import Product, Mix
from .forms import MixForm

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
    if request.method == 'POST':
        form = MixForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('tobaccos:mixes'))
    else:
        form = MixForm()
    return render(request, 'mixes/create_mix.html', {'form':form})
