from django import forms
from .models import Mix

class MixForm(forms.ModelForm):
    class Meta:
        model = Mix
        fields = ['author_name', 'author_link', 'description', 'rating']
        

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # self.fields['structure'].widget.attrs.update({
        #     'id':"id_structure",
        #     'placeholder':'first',
        #     'secondaryPlaceholder':'second',
        # })
        
        self.fields['author_link'].widget.attrs.update({
            'placeholder':'Introduce urself',
            'label':'Author_link',
        })

