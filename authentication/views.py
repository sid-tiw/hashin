from django.shortcuts import redirect, render
from django.contrib import messages
from django.contrib.auth.models import User
from .forms import CreateUserForm, loginform, AuthenticationForm
from django.contrib.auth import authenticate, login, logout
import mysql.connector
from datetime import datetime, date, timedelta
from authentication.verify import verify_email_generate

relations = {}
relations['user'] = (
    "CREATE TABLE IF NOT EXISTS `user` ("
    "   `username` char(100) NOT NULL,"
    "   `password` char(35) NOT NULL,"
    "   `email` char(100) NOT NULL,"
    "   `fname` char(200),"
    "   `sname` char(200),"
    "   `ratings` INT,"
    "   `createdon` DATE,"
    "   `gender` char,"
    "   `verified` int,"
    "   `sha_hash` char(202)"
    ")"
)

relations['contest'] = (
    "CREATE TABLE IF NOT EXISTS `contest` ("
    "   `contest_ID` char(100) NOT NULL,"
    "   `number_of_questions` INT,"
    "   `problem_codes` JSON,"
    "   `contest_rating` INT,"
    "   `contest_date` DATE"
    ")"
)

insert_queries = {}

insert_queries['user'] = (
    "INSERT INTO user VALUES ("
    "%s, %s, %s, %s, %s, %s, %s, %s, %s)"
)

insert_queries['contest'] = (
    "INSERT INTO contest VALUES ("
    "%s, %s, %s, %s, %s)"
)

insert_queries['user_init'] = (
    "INSERT INTO user (username, password, email, createdon, verified, sha_hash) VALUES ("
    "%s, %s, %s, %s, %s, %s)"
)

select_queries = {}

select_queries['user_hash'] = (
    "SELECT * FROM user WHERE sha_hash=%s"
)

select_queries['user'] = (
    "SELECT * FROM user"
)

update_queries = {}

update_queries['fname'] = (
    "UPDATE user SET fname=%s"
)

update_queries['sname'] = (
    "UPDATE user SET sname=%s"
)

update_queries['verified'] = (
    "UPDATE user SET verified=%s"
)

update_queries['gender'] = (
    "UPDATE user SET gender=%s"
)


def connect_mysql():
    new_connection = mysql.connector.connect(
        user="root", password="long", host='127.0.0.1')
    cursor = new_connection.cursor(dictionary=True)
    cursor.execute(
        'CREATE DATABASE IF NOT EXISTS hashin CHARACTER SET utf8;')
    cursor.execute(
        'USE hashin;'
    )
    cursor.execute(relations['user'])
    cursor.execute(relations['contest'])    # relations here
    new_connection.commit()
    cursor.close()
    return new_connection


def registerPage(request):
    if request.user.is_authenticated:
        return redirect('home')
    else:
        if request.method == 'POST':
            new_connection = connect_mysql()
            temp = request.POST
            print(temp)
            details = {}
            details['username'] = temp.get('username')
            details['email'] = temp.get('email')
            password1 = temp.get('password1')
            password2 = temp.get('password2')
            if password1 != password2:
                messages.error(request, "Both the passwords must be same!")
            else:
                details['password'] = password1
                cursor = new_connection.cursor()
                sha_hash = verify_email_generate(details)
                cursor.execute(
                    insert_queries['user_init'], (details['username'], details['password'], details['email'], date.today(), 0, sha_hash))
                messages.info(
                    request, "Verify your account by clicking on the link in the mail we have sent you!")
                new_connection.commit()
                cursor.close()
                new_connection.close()
                return redirect('login')
        else:
            get_params = request.GET
            if get_params:
                new_connection = connect_mysql()
                cursor = new_connection.cursor(dictionary=True)
                sec_token = str(get_params['sec_token'])
                sec_token = sec_token.encode('utf-8')
                cursor.execute(
                    select_queries['user_hash'], (sec_token,))
                ult_user = {}
                for val in cursor:
                    ult_user = val
                if ult_user:
                    if ult_user['verified'] == 1:
                        messages.info(request, "User is already verified!")
                        return redirect('home')
                    user = User.objects.create_user(
                        ult_user['username'], ult_user['email'], ult_user['password'])
                    cursor.execute(update_queries['verified'], (1,))
                    messages.success(
                        request, "Your account was verified successfully!!")
                    new_connection.commit()
                    cursor.close()
                    new_connection.close()
                    return redirect('login')
                else:
                    messages.error(
                        request, "The webpage you are trying to access in not available!")
                    cursor.close()
                    new_connection.close()
                    return redirect('home')
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
                messages.error(request, 'Username OR password is incorrect')
                return redirect('login')
        else:
            form = loginform()
            context = {'form': form}
            return render(request, 'login.html', context)


def logoutUser(request):
    logout(request)
    return redirect('home')
