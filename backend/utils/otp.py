from flask import current_app
from twilio.rest import Client
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from app.app import db
from datetime import datetime, timedelta
from utils.status import handle_error, handle_success
from utils.validation import get_customer_by_contact, is_valid_email
import random
import ssl

# Create an OTP
def create_temp_password():
    return ''.join([str(random.randint(0, 9)) for _ in range(6)])

# Send an OTP via email
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

# Send an OTP via SMS
def send_sms(phone, message):
    account_sid = current_app.config['TWILIO_ACCOUNT_SID']
    auth_token = current_app.config['TWILIO_AUTH_TOKEN']
    twilio_phone_number = current_app.config['TWILIO_PHONE_NUMBER']    
    client = Client(account_sid, auth_token)

    message = client.messages.create(
        body=message,
        from_=twilio_phone_number,
        to=phone
    )
    return message.sid

# Request OTP
def request_temp_password(contact):
    customer = get_customer_by_contact(contact)

    if not customer:
        return handle_error('Customer not found', 404)

    temp_password = create_temp_password()
    print('temp_password: ' , temp_password)
    temp_password_expiry = datetime.now() + timedelta(minutes=5)

    customer.temporary_password = temp_password
    customer.password_expiry = temp_password_expiry
    db.session.commit()

    message = f"Your verification code is {temp_password}. It will expire in 10 minutes."
    if is_valid_email(contact):
        send_email(customer.email, message)
    else:
        send_sms(customer.phone, message)

    return handle_success('Temporary password sent')