from django import forms
from .models import Mix

class MixForm(forms.ModelForm):
    class Meta:
        model = Mix
        fields = ['structure', 'description']
        

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        


