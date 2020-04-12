from django.urls import path

from . import views

app_name = 'tobaccos'

urlpatterns = [
    path('', views.ProductIndexView, name='index'),
    path('mixes/', views.MixIndexView, name='mixes'),
    path('mixes/create_mix/', views.create_mix, name='create_mix'),
    path('products/', views.ProductIndexView, name="products"),
    path('mixes/delete/<int:mix_id>/', views.delete_mix, name='delete_mix')
]