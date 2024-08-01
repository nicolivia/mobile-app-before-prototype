from flask import current_app
from twilio.rest import Client
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import random
import re
import ssl

# Validation functions
def is_valid_email(email):
    return re.match(r"[^@]+@[^@]+\.[^@]+", email)

def is_valid_phone(phone):
    return re.match(r"^\+?[1-9]\d{1,14}$", phone)

# Create an OTP
def create_temp_password():
    return ''.join([str(random.randint(0, 9)) for _ in range(6)])

# Send an OTP via SMS
def send_sms(to, message):
    account_sid = current_app.config['TWILIO_ACCOUNT_SID']
    auth_token = current_app.config['TWILIO_AUTH_TOKEN']
    twilio_phone_number = current_app.config['TWILIO_PHONE_NUMBER']    
    client = Client(account_sid, auth_token)

    message = client.messages.create(
        body=message,
        from_=twilio_phone_number,
        to=to
    )
    return message.sid

# Send an OTP via Email
def send_email(email, message):
    message = Mail(
        from_email=current_app.config['MAIL_FROM'],
        to_emails=email,
        subject='Your OTP Code',
        html_content=message
    )
    ssl._create_default_https_context = ssl._create_unverified_context
    sg = SendGridAPIClient(current_app.config['SENDGRID_API_KEY'])
    response = sg.send(message)
    return response.status_code