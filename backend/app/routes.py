from flask import request, jsonify, url_for, redirect, session
from flask_bcrypt import Bcrypt
from flask_mail import Mail, Message
from app import app, db
from models import User
from backend.utils.utils import set_session, get_session
from datetime import datetime, timedelta
import random
import string
from utils import create_temp_password, send_email
from datetime import datetime, timedelta


bcrypt = Bcrypt(app)
mail = Mail(app)

# CURD for customers
@app.route('/api/customers/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    temp_password = data.get('temporary_password')
    user = User.query.filter_by(email=email).first()

    if user and user.temporary_password == temp_password:
        if datetime.datetime.now() > user.password_expiry:
            return handle_error('Temporary password expired', 403)
        user.temporary_password = None
        user.password_expiry = None
        db.session.commit()
        return handle_success('Login successful')
    return handle_error('Invalid credentials', 401)

# Create and email a temporary password
@app.route('/api/password', methods=['POST'])
def request_temp_password():
    data = request.get_json()
    email = data.get('email')
    
    if not email:
        return handle_error('Email is required', 400)
    
    customer = Customers.query.filter_by(email=email).first()
    if not customer:
        return handle_error('Customer not found', 404)
    
    temp_password = create_temp_password()
    temp_password_expiry = datetime.now() + timedelta(minutes=1)
    
    customer.temp_password = temp_password
    customer.temp_password_expiry = temp_password_expiry
    db.session.commit()
    
    email_body = f"Your temporary password is {temp_password}. It will expire in 1 minute."
    send_email(customer.email, "Temporary Password Request", email_body)
    
    return handle_success('Temporary password sent to your email')


def handle_success(message):
    return jsonify(message), 200

def handle_error(message, status_code):
    return jsonify({"error": str(message)}), status_code
