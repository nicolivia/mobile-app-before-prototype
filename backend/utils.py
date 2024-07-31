from flask import session, current_app
from email.mime.text import MIMEText
from twilio.rest import Client
import random
import smtplib
import re

# Session management for customers
def set_customer_session(customer_id):
    session['customer_id'] = customer_id
    current_app.logger.info(f'Session data: {session}')

def get_customer_session():
    current_app.logger.info(f"Session data on get_session: {session}")
    return session.get('customer_id')

# Session management for employees
def set_staff_session(employee_id):
    session['employee_id'] = employee_id
    current_app.logger.info(f'Session data: {session}')

def get_employee_session():
    current_app.logger.info(f'Session data on get_session: {session}')
    return session.get('employee_id')

# Validation functions
def is_valid_email(email):
    return re.match(r"[^@]+@[^@]+\.[^@]+", email)

def is_valid_phone(phone):
    return re.match(r"^\+?[1-9]\d{1,14}$", phone)

# Create a temporary password
def create_temp_password():
    return ''.join([str(random.randint(0, 9)) for _ in range(6)])

# Send an email with a temporary password to a customer
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
        
def send_sms(phone, message):
    client = Client(current_app.config['TWILIO_ACCOUNT_SID'], current_app.config['TWILIO_AUTH_TOKEN'])
    message = client.messages.create(
        body=message,
        from_= current_app.config['PHONE_NUMBER'],
        to=phone
    )
    return message.sid