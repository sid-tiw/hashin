from django import forms


class codeForm(forms.Form):
    file_inp = forms.FileField()
    code_editor = forms.TextInput()
    is_file = forms.TextInput()
    pcode = forms.TextInput()
    lang = forms.TextInput()
    ctest = forms.TextInput()
