from flask import request, jsonify, current_app
from app.app import app, db
from app.models import Customers, Employees
from utils import create_temp_password, send_email, send_sms, is_valid_email, is_valid_phone
from datetime import datetime, timedelta
from flask_bcrypt import Bcrypt
import jwt

blacklist = set()
bcrypt = Bcrypt(app)
PEPPER = app.config['SECRET_KEY']

# Customers' CRUD
@app.route('/api/customers/signup', methods=['POST'])
def create_customer():
    data = request.get_json()
    contact = data.get('contact')
    customer = get_customer_by_contact(contact)
    
    if not contact:
        return handle_error('Email or phone number is required', 400)
    if customer:
        return handle_error('Customer already exists', 409)

    new_customer = Customers(
        email=contact if is_valid_email(contact) else None,
        phone=contact if is_valid_phone(contact) else None,
    )
    db.session.add(new_customer)
    db.session.commit()

    # Send OTP
    return request_temp_password(contact)

@app.route('/api/customers/login', methods=['POST'])
def login_customer():
    data = request.get_json()
    contact = data.get('contact')
    if not contact:
        return handle_error('Email or phone number is required', 400)
    
    customer = get_customer_by_contact(contact)
    if not customer:
        return handle_error('Customer not found', 404)
    
    return request_temp_password(contact)

@app.route('/api/customers/verify', methods=['POST'])
def verify_otp():
    data = request.get_json()
    contact = data.get('contact')
    otp = data.get('otp')
    
    customer = get_customer_by_contact(contact)
    if not customer:
        return handle_error('Customer not found', 404)
    
    if customer.temporary_password != otp:
        return handle_error('Invalid OTP', 400)

    if datetime.now() > customer.password_expiry:
        return handle_error('OTP expired', 400)

    customer.temporary_password = None
    customer.password_expiry = None
    db.session.commit()

    token = generate_jwt({'customer_id': customer.id, 'role': 'customer'})
    return jsonify({'message': 'OTP verified', 'token': token}), 200

# Employees' CRUD
@app.route('/api/employees/signup', methods=['POST'])
def create_employee():
    data = request.get_json()
    employee_id = data.get('employee_id')
    full_name = data.get('full_name')
    password = data.get('password')
    pepper = PEPPER
    password_with_pepper = (password + pepper).encode('utf-8')
    hashed_password = bcrypt.generate_password_hash(password_with_pepper).decode('utf-8')
    
    if not employee_id:
        return handle_error('Employee ID is required', 400)
    if not full_name:
        return handle_error('Full name is required', 400)
    if not password:
        return handle_error('Password is required', 400)
    
    if get_employee_by_id(employee_id):
        return handle_error('Employee already exists', 409)
    
    new_employee = Employees(
        employee_id=employee_id,
        full_name=full_name,
        password=hashed_password,
        img_url=data.get('imgUrl', None)
    )
    db.session.add(new_employee)
    db.session.commit()

    token = generate_jwt({'employee_id': new_employee.employee_id, 'role': 'employee'})
    return jsonify({'message': 'Employee created successfully', 'token': token}), 201

@app.route('/api/employees/login', methods=['POST'])
def login_employee():
    data = request.get_json()
    employee_id = data.get('employee_id')
    password = data.get('password')
    employee = get_employee_by_id(employee_id)
    password_with_pepper = (password + PEPPER).encode('utf-8')
    
    if not employee_id:
        return handle_error('Employee ID is required', 400)
    if not password:
        return handle_error('Password is required', 400)
    if not employee:
        return handle_error('Employee not found', 404)
    
    if bcrypt.check_password_hash(employee.password, password_with_pepper):
        token = generate_jwt({'employee_id': employee.employee_id, 'role': 'employee'})
        return jsonify({'message': 'Login successful', 'token': token}), 200
    else:
        return handle_error('Invalid credentials', 400)

# Common routes
@app.route('/api/users/logout', methods=['POST'])
def logout_user():
    auth_header = request.headers.get('Authorization')
    if auth_header:
        token = auth_header.split(" ")[1]
        blacklist.add(token)
    return handle_success('Logout successful')

# Get current user info
@app.route('/api/users/me', methods=['GET'])
def get_me():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return handle_error('No authorization token provided', 401)
    
    try:
        token = auth_header.split(" ")[1]
        if is_token_blacklisted(token):
            return handle_error('Token has been revoked', 401)
        
        data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        user_id = data.get('customer_id') or data.get('employee_id')
        role = data.get('role')
        
        if role == 'customer':
            user = Customers.query.get(user_id)
            if not user:
                return handle_error('User not found', 404)
            
            return jsonify({
                'id': user.id,
                'fullName': user.full_name,
                'email': user.email,
                'phone': user.phone,
                'dob': user.dob,
                'ethnicity': user.ethnicity,
                'gender': user.gender,
                'address': user.address,
            }), 200
        elif role == 'employee':
            user = Employees.query.get(user_id)
            if not user:
                return handle_error('User not found', 404)

            return jsonify({
                'id': user.id,
                'employee_id': user.employee_id,
                'full_name': user.full_name,
                'imgUrl': user.img_url,
            }), 200
        else:
            return handle_error('Invalid role', 401)
        
    except jwt.ExpiredSignatureError:
        return handle_error('Token has expired', 401)
    except jwt.InvalidTokenError:
        return handle_error('Invalid token', 401)

# Helpers
def request_temp_password(contact):
    customer = get_customer_by_contact(contact)

    if not customer:
        return handle_error('Customer not found', 404)

    temp_password = create_temp_password()
    temp_password_expiry = datetime.now() + timedelta(minutes=1)

    customer.temporary_password = temp_password
    customer.password_expiry = temp_password_expiry
    db.session.commit()

    message = f"Your verification code is {temp_password}. It will expire in 1 minutes."
    if is_valid_email(contact):
        send_email(customer.email, message)
    else:
        send_sms(customer.phone, message)

    return handle_success('Temporary password sent')

def confirm_customer(contact):
    if is_valid_email(contact):
        return Customers.query.filter_by(email=contact).first()
    elif is_valid_phone(contact):
        return Customers.query.filter_by(phone=contact).first()
    else:
        return None
    
def get_customer_by_contact(contact):
    if is_valid_email(contact):
        return Customers.query.filter_by(email=contact).first()
    elif is_valid_phone(contact):
        return Customers.query.filter_by(phone=contact).first()
    else:
        return None
    
def is_token_blacklisted(token):
    return token in blacklist

def generate_jwt(data):
    token = jwt.encode(data, current_app.config['SECRET_KEY'], algorithm='HS256')
    return token

def get_employee_by_id(employee_id):
    return Employees.query.filter_by(employee_id=employee_id).first()

def handle_success(message):
    return jsonify({"message": message}), 200

def handle_error(message, status_code):
    return jsonify({"error": str(message)}), status_code