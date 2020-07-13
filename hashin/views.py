from django.shortcuts import redirect, render
from django.contrib import messages
from django.utils.safestring import SafeString
from .forms import codeForm
from .extensions import file_extensions
import string
from time import time


def init_login(request):
    stat = request.user.is_authenticated
    link1 = "src='/static/user_default_images/no_user.png'"
    if stat:
        link2p1 = "src='/static/user_default_images/"
        link2p2 = (request.user.username[0]).upper()
        link2p3 = ".png'"
        link2 = link2p1 + link2p2 + link2p3
        context = {'authenticated': stat,
                   'img_link': SafeString(link2),
                   'username': request.user.username}
    else:
        context = {'authenticated': stat,
                   'img_link': SafeString(link1)}
    return context


def homepage(request):
    return render(request, "homepage.html", init_login(request))


def submit(request):
    # dict_get = request.GET
    # if "pcode" in dict_get.keys():
    return render(request, "submit.html", init_login(request))


def submissions(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            cForm = codeForm(request.POST, request.FILES)
            if cForm.is_valid():
                code_file = request.FILES["file_inp"]
                
                # Check for problem code

                full_path = "./users/" + request.user.username + "/submissions/" + \
                    request.POST['pcode'] + \
                    str(time()) + file_extensions[request.POST['lang']]
                
                with open(full_path, "wb+") as destination:
                    for part in code_file.chunks():
                        destination.write(part)

                return render(request, "submissions.html", init_login(request))
        else:
            return redirect("login")
