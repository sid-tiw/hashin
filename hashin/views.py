from django.shortcuts import redirect, render
from django.contrib import messages

def homepage(request):
	return render(request, "header.html");