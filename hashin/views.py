from django.shortcuts import redirect, render
from django.contrib import messages
from django.utils.safestring import SafeString


def homepage(request):
    stat = request.user.is_authenticated
    link1 = "src='/static/user_default_images/no_user.png'"
    if stat:
        context = {'authenticated': stat}
    else:
        context = {'authenticated': stat,
                   'img_link': SafeString(link1)}
    return render(request, "homepage.html", context)
