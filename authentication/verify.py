from smtplib import SMTP, SMTP_SSL
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from django.utils.safestring import SafeString
import string
import random
import hashlib


def verify_email_generate(user):
    hashin_mail = "hashin.team@gmail.com"
    user_mail = user['email']
    name = user['username']

    message = MIMEMultipart("alternative")
    message["Subject"] = "Verify your account"
    message["From"] = hashin_mail
    message["To"] = user_mail

    html_file = open("message.html", "r").read()
    text_file = open("message.txt", "r").read()

    link = "http://localhost:8000/register?verify=true&sec_token="
    sec_token = gen_sec_token(user)
    link += sec_token

    var1 = '--link--'
    var2 = '--name--'

    html_file = html_file.replace(SafeString(var1), link)
    text_file = text_file.replace(SafeString(var1), link)
    html_file = html_file.replace(SafeString(var2), name)
    text_file = text_file.replace(SafeString(var2), name)

    text_mess = MIMEText(text_file, "plain")
    html_mess = MIMEText(html_file, "html")

    message.attach(text_mess)
    message.attach(html_mess)

    with SMTP_SSL(host="smtp.gmail.com", port=465) as smtp:
        smtp.login("hashin.team@gmail.com", "*******")
        smtp.sendmail(hashin_mail,
                      user_mail, message.as_string())
    return sec_token


def gen_sec_token(user):
    password = user['password']
    username = user['username']
    email = user['email']
    hash_text = ""
    hash_text += password + "----" + username + \
        "----" + email + "----" + randomString()
    hash_text = hash_text.encode('utf-8')
    return hashlib.sha256(hash_text).hexdigest()


def randomString(stringLength=10):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(stringLength))
