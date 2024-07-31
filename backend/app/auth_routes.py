from flask import request, jsonify, current_app
from app.app import app, db
from app.models import Customers, Employees
from utils import create_temp_password, send_email, send_sms, is_valid_email, is_valid_phone
from datetime import datetime, timedelta
from flask_bcrypt import Bcrypt
import jwt

bcrypt = Bcrypt(app)
PEPPER = app.config['SECRET_KEY']

def generate_jwt(data):
    token = jwt.encode(data, current_app.config['SECRET_KEY'], algorithm='HS256')
    return token

# Customers' CRUD
@app.route('/api/customers/signup', methods=['POST'])
def create_customer():
    data = request.get_json()
    contact = data.get('contact')
    if not contact:
        return handle_error('Email or phone number is required', 400)
    
    # Check if customer already exists
    customer = get_customer_by_contact(contact)
    if customer:
        return handle_error('Customer already exists', 409)

    new_customer = Customers(
        email=contact if is_valid_email(contact) else None,
        phone=contact if is_valid_phone(contact) else None,
        fullName=data.get('fullName', None),
        dob=data.get('dob', None),
        ethnicity=data.get('ethnicity', None),
        gender=data.get('gender', None),
        address=data.get('address', None),
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
    employee_id = data.get('employeeId')
    full_name = data.get('fullName')
    password = data.get('password')
    
    if not all([employee_id, full_name, password]):
        return handle_error('Employee ID, full name, and password are required', 400)
    
    if get_employee_by_id(employee_id):
        return handle_error('Employee already exists', 409)
    
    pepper = PEPPER
    password_with_pepper = (password + pepper).encode('utf-8')
    hashed_password = bcrypt.generate_password_hash(password_with_pepper).decode('utf-8')
    
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
    employee_id = data.get('employeeId')
    password = data.get('password')
    
    employee = get_employee_by_id(employee_id)
    if not employee:
        return handle_error('Employee not found', 404)
    
    password_with_pepper = (password + PEPPER).encode('utf-8')
    if bcrypt.check_password_hash(employee.password, password_with_pepper):
        token = generate_jwt({'employee_id': employee.employee_id, 'role': 'employee'})
        return jsonify({'message': 'Login successful', 'token': token}), 200
    else:
        return handle_error('Invalid credentials', 400)

# Common routes
@app.route('/api/users/logout', methods=['POST'])
def logout_user():
    return handle_success('Logout successful')

@app.route('/api/users/me', methods=['POST'])
def get_me():
    return handle_success('get user information')

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

    message = f"Your temporary password is {temp_password}. It will expire in 15 minutes."
    if is_valid_email(contact):
        send_email(customer.email, "Temporary Password Request", message)
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

def get_employee_by_id(employee_id):
    return Employees.query.filter_by(employee_id=employee_id).first()

def handle_success(message):
    return jsonify({"message": message}), 200

def handle_error(message, status_code):
    return jsonify({"error": str(message)}), status_code