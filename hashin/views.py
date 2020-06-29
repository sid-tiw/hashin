from django.shortcuts import redirect, render
from django.contrib import messages
from django.utils.safestring import SafeString
import string


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
