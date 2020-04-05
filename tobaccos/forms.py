from django import forms
from .models import Mix

class MixForm(forms.ModelForm):
    description = forms.Textarea()

    class Meta:
        model = Mix
        fields = "__all__"