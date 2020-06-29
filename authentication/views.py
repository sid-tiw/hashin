from django.shortcuts import redirect, render
from django.contrib import messages
from django.contrib.auth.models import User
from .forms import CreateUserForm, loginform, AuthenticationForm
from django.contrib.auth import authenticate, login, logout

# Create your views here.


def registerPage(request):
    if request.user.is_authenticated:
        return redirect('home')
    else:
        if request.method == 'POST':
            temp = request.POST
            print(temp)
            username = temp.get('username')
            email = temp.get('email')
            password1 = temp.get('password1')
            password2 = temp.get('password2')
            print(username)
            print(password1)
            print(password2)
            if password1 != password2:
                messages.error(request, "Both the passwords must be same!")
            user = User.objects.create_user(username, email, password1)
            messages.success(request, 'Account created successfuly!')
            return redirect('login')
        else:
            form = CreateUserForm()
            context = {'form': form}
            return render(request, "register.html", context)


def loginPage(request):
    if request.user.is_authenticated:
        return redirect('home')
    else:
        if request.method == 'POST':
            username = request.POST.get('username')
            password = request.POST.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')
            else:
                messages.info(request, 'Username OR password is incorrect')
        else:
            form = loginform()
            context = {'form': form}
            return render(request, 'login.html', context)


def logoutUser(request):
    logout(request)
    return redirect('home')
