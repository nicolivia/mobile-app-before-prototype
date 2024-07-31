from flask import request, jsonify
from app.app import app, db
from app.models import Customers
from utils import create_temp_password, send_email, send_sms, is_valid_email, is_valid_phone
from datetime import datetime, timedelta

@app.route('/api/customers/login', methods=['POST'])
def login():
    # Login logic here
    pass

@app.route('/api/password', methods=['POST'])
def request_temp_password():
    data = request.get_json()
    contact = data.get('contact')

    if not contact:
        return handle_error('Email/Phone number is required', 400)

    customer = None
    if is_valid_email(contact):
        customer = Customers.query.filter_by(email=contact).first()
    elif is_valid_phone(contact):
        customer = Customers.query.filter_by(phone=contact).first()
    else:
        return handle_error('Invalid contact information', 400)

    if not customer:
        return handle_error('Customer not found', 404)

    temp_password = create_temp_password()
    temp_password_expiry = datetime.now() + timedelta(minutes=1)

    customer.temporary_password = temp_password
    customer.password_expiry = temp_password_expiry
    db.session.commit()

    message = f"Your temporary password is {temp_password}. It will expire in 15 minutes."
    if is_valid_email(contact):
        send_email(customer.email, "Temporary Password Request", message)
    else:
        send_sms(customer.phone, message)

    return handle_success('Temporary password sent')

def handle_success(message):
    return jsonify(message), 200

def handle_error(message, status_code):
    return jsonify({"error": str(message)}), status_code