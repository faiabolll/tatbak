from django.urls import path

from . import views

app_name = 'tobaccos'

urlpatterns = [
    path('', views.ProductIndexView, name='index'),
    path('mixes/', views.MixIndexView, name='mixes'),
    path('mixes/create_mix/', views.create_mix, name='create_mix'),
    path('products/', views.ProductIndexView, name="products"),
    path('mixes/delete/<int:mix_id>/', views.delete_mix, name='delete_mix'),
    # path('mixes/get_names/<str:brand_name>/', views.get_names_for_tobacco_brand, name='get_names_for_tobacco_brand'),
    # path('mixes/get_names_of_brands/', views.get_distinct_brand_names, name='get_distinct_brand_names'),
    path('mixes/get_names_for_autocomplete/', views.get_names_for_autocomplete, name='get_names_for_autocomplete'),
]