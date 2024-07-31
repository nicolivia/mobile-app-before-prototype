from flask import current_app
from twilio.rest import Client
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import random
import re

# Validation functions
def is_valid_email(email):
    return re.match(r"[^@]+@[^@]+\.[^@]+", email)

def is_valid_phone(phone):
    return re.match(r"^\+?[1-9]\d{1,14}$", phone)

# Create an OTP
def create_temp_password():
    return ''.join([str(random.randint(0, 9)) for _ in range(6)])

# Send an OTP via SMS
def send_sms(phone, message):
    sid = current_app.config['TWILIO_ACCOUNT_SID']
    token = current_app.config['TWILIO_AUTH_TOKEN']
    client = Client(sid, token)
    message = client.messages.create(
        body=message,
        from_= current_app.config['PHONE_NUMBER'],
        to=phone
    )
    return message.sid

# Send an OTP via Email
def send_email(email, otp):
    message = Mail(
        from_email=current_app.config['MAIL_USERNAME'],
        to_emails=email,
        subject='Your OTP Code',
        html_content=f'<strong>Your OTP is {otp}</strong>'
    )
    sg = SendGridAPIClient(current_app.config['SENDGRID_API_KEY'])
    response = sg.send(message)
    return response.status_code