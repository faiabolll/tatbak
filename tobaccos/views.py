from django.shortcuts import render, reverse
from django.views import generic
from django.http import HttpResponseRedirect, JsonResponse
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
    context = {'recent_mixes_list':query, 'form':MixForm()}
    return render(request, 'mixes/index.html', context)

def create_mix(request):
    query = Mix.objects.all()
    if request.method == 'POST':
        form = MixForm(request.POST)
        if form.is_valid():
            new_mix = form.save()
            return JsonResponse({'new_mix': forms.models.model_to_dict(new_mix)}, status=200)
    else:
        form = MixForm()
    context = {'recent_mixes_list':query, 'form':form}
    return render(request, 'mixes/index.html', context)

