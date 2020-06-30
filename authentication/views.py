from django.shortcuts import redirect, render
from django.contrib import messages
from django.contrib.auth.models import User
from .forms import CreateUserForm, loginform, AuthenticationForm
from django.contrib.auth import authenticate, login, logout
# import mysql.connector

# relations = {}
# relations['user'] = (
#     "CREATE TABLE IF NOT EXISTS `user` ("
#     "   `username` char(100) NOT NULL,"
#     "   `fname` char(200),"
#     "   `sname` char(200),"
#     "   `password` char(35) NOT NULL,"
#     "   `ratings` INT,"
#     "   `createdon` DATE,"
#     "   `gender` char"
#     ")"
# )

# relations['contest'] = (
#     "CREATE TABLE IF NOT EXISTS `contest` ("
#     "   `contest_ID` char(100) NOT NULL,"
#     "   `number_of_questions` INT,"
#     "   `problem_codes` JSON,"
#     "   `contest_rating` INT,"
#     "   `contest_date` DATE"
#     ")"
# )


# def connect_mysql():
#     new_connection = mysql.connector.connect(
#         user="root", password="int", host='127.0.0.1')
#     new_connection._execute_query(
#         'CREATE DATABASE IF NOT EXISTS hashin CHARACTER SET utf8;')
#     new_connection._execute_query(
#         'USE hashin;'
#     )
#     new_connection._execute_query(
#         'CREATE TABLE IF NOT EXISTS user (username VARCHAR(100) PRIMARY KEY, fname VARCHAR(200), sname VARCHAR(200), password VARCHAR(), ratings INT;'
#     )
#     return new_connection


def registerPage(request):
    if request.user.is_authenticated:
        return redirect('home')
    else:
        if request.method == 'POST':
            # new_connection = connect_mysql()
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
