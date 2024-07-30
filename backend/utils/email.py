from flask import current_app
from email.mime.text import MIMEText
import random
import smtplib

# Create a temporary password
def create_temp_password():
    return ''.join([str(random.randint(0, 9)) for _ in range(6)])

# Send a temporary password to a customer
def send_email(recipient, subject, body):
    sender = current_app.config['MAIL_USERNAME']
    password = current_app.config['MAIL_PASSWORD']
    smtp_server = current_app.config['MAIL_SERVER']
    smtp_port = current_app.config['MAIL_PORT']
    
    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = sender
    msg['To'] = recipient

    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(sender, password)
        server.sendmail(sender, [recipient], msg.as_string())