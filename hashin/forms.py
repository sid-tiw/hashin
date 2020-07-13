from django import forms


class codeForm(forms.Form):
    codeFile = forms.FileField(allow_empty_file=True)
    codeEditor = forms.TextInput()
    isFile = forms.BooleanField()
    pcode = forms.TextInput()
    lang = forms.TextInput()
    ctest = forms.BooleanField()
