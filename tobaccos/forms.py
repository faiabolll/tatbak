from django import forms
from .models import Mix

class MixForm(forms.ModelForm):
    description = forms.Textarea()

    class Meta:
        model = Mix
        fields = "__all__"
        widgets = {
            'author_name': forms.TextInput(attrs={
                'placeholder':'Who are u?',
            }),
            'description': forms.Textarea(attrs={
                'placeholder': 'describe it',
            })
        }

