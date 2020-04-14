from django.shortcuts import render, reverse
from django.views import generic
from django.http import HttpResponseRedirect, JsonResponse, HttpResponse
from django import forms
from .models import Product, Mix, Tobacco
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
    
def delete_mix(request, mix_id):
    if request.method=='POST':
        mix = Mix.objects.get(id=mix_id)
        mix.delete()
        return JsonResponse({'result': 'ok'}, status=200)
    else:
        create_mix(request)

# def get_names_for_tobacco_brand(request, brand_name):
#     if request.method == 'GET':
#         query_set = Tobacco.objects.filter(
#             brand=brand_name,
#         )
#         names = [tobacco.flavour for tobacco in query_set]
#         return JsonResponse({'result':'ok', 'names_for_tobacco_brand':names}, status=200)
#     else:
#         return HttpResponse('asdasd')

# def get_distinct_brand_names(request):
#     if request.method == 'GET':
#         query_set = Tobacco.objects.values_list('brand').distinct()
#         names = [brand[0] for brand in query_set]       
#         return JsonResponse({'result':'ok', 'brand_names':names}, status=200)
#     else:
#         return HttpResponse('asdasd')

def get_names_for_autocomplete(request):
    if request.method == 'GET':
        brand_names = Tobacco.objects.values_list('brand').distinct()
        def get_list_of_tobacco_names(brand):
            tobacco_names = Tobacco.objects.filter(brand=brand)
            return [tobacco.flavour for tobacco in tobacco_names]
        autocomplete_options = {brand[0]:get_list_of_tobacco_names(brand[0]) for brand in brand_names}
        return JsonResponse({"result":"ok", "autocomplete_options":autocomplete_options})
    else:
        return HttpResponse('error message')
        