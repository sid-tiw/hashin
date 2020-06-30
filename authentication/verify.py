from smtplib import SMTP, SMTP_SSL
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

hashin_mail = "hashin.team@gmail.com"
user_mail = "201851127@iiitvadodara.ac.in"

message = MIMEMultipart("alternative")
message["Subject"] = "Verify your account"
message["From"] = hashin_mail
message["To"] = user_mail

with SMTP_SSL(host="smtp.gmail.com", port=465) as smtp:
    smtp.login("hashin.team@gmail.com", "*******")
    smtp.sendmail(hashin_mail,
                  user_mail, "Hello, This is a test mail!")
