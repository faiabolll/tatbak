from django.urls import path

from . import views

app_name = 'tobaccos'

urlpatterns = [
    path('', views.ProductIndexView, name='index')
]