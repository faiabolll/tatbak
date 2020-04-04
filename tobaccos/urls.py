from django.urls import path

from . import views

app_name = 'tobaccos'

urlpatterns = [
    path('', views.ProductIndexView, name='index'),
    path('mixes/', views.MixIndexView, name='mixes'),
    path('mixes/create_mix/', views.create_mix, name='create_mix')
]