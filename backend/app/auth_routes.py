from flask import Blueprint, request, jsonify, current_app
from app.app import db
from app.models import Customers, Employees
from utils.otp import request_temp_password
from utils.jwt import generate_jwt, blacklist_jwt
from utils.validation import is_valid_email, is_valid_phone, get_customer_by_contact, get_employee_by_id
from utils.status import handle_error, handle_success
from datetime import datetime
from flask_bcrypt import Bcrypt

bp = Blueprint('auth', __name__)
bcrypt = Bcrypt()
PEPPER = "your_secret_key"  # Replace with app.config['SECRET_KEY']
blacklist = set()

# Customer Routes
@bp.route('/api/customers/requestotp', methods=['POST'])
def request_otp():
    data = request.get_json()
    contact = data.get('contact')

    if not contact:
        return handle_error('Email or phone number is required', 400)
    
    customer = get_customer_by_contact(contact)
    
    if not customer:
        new_customer = Customers(
            email=contact if is_valid_email(contact) else None,
            phone=contact if is_valid_phone(contact) else None,
        )
        db.session.add(new_customer)
        db.session.commit()
        customer = new_customer
    
    if customer.password_expiry is None or datetime.now() > customer.password_expiry:
        # Generate a new OTP if the previous one has expired
        return request_temp_password(contact)

@bp.route('/api/customers/verifyotp', methods=['POST'])
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

@bp.route('/api/customers/update', methods=['POST'])
def update_contact():
    data = request.get_json()
    customer_id = data.get('customer_id')
    new_contact = data.get('new_contact')

    if not customer_id or not new_contact:
        return handle_error('Customer ID and new contact information are required', 400)
    
    customer = Customers.query.get(customer_id)
    if not customer:
        return handle_error('Customer not found', 404)
    
    if is_valid_email(new_contact):
        # Check for existing email
        if Customers.query.filter_by(email=new_contact).first():
            return handle_error('Email is already in use', 409)
        customer.email = new_contact
    elif is_valid_phone(new_contact):
        # Check for existing phone number
        if Customers.query.filter_by(phone=new_contact).first():
            return handle_error('Phone number is already in use', 409)
        customer.phone = new_contact
    else:
        return handle_error('Invalid email or phone number format', 400)
    
    db.session.commit()
    return handle_success('Contact information updated successfully')

@bp.route('/api/customers/login', methods=['POST'])
def login_customer():
    data = request.get_json()
    contact = data.get('contact')
    if not contact:
        return handle_error('Email or phone number is required', 400)
    
    customer = get_customer_by_contact(contact)
    if not customer:
        return handle_error('Customer not found', 404)
    
    return request_temp_password(contact)

# Employee Routes
@bp.route('/api/employees/signup', methods=['POST'])
def create_employee():
    data = request.get_json()
    employee_id = data.get('employee_id')
    full_name = data.get('full_name')
    password = data.get('password')
    pepper = PEPPER

    if not employee_id:
        return handle_error('Employee ID is required', 400)
    if not full_name:
        return handle_error('Full name is required', 400)
    if not password:
        return handle_error('Password is required', 400)
    
    if get_employee_by_id(employee_id):
        return handle_error('Employee already exists', 409)
    
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

@bp.route('/api/employees/login', methods=['POST'])
def login_employee():
    data = request.get_json()
    employee_id = data.get('employee_id')
    password = data.get('password')
    employee = get_employee_by_id(employee_id)
    
    if not employee_id:
        return handle_error('Employee ID is required', 400)
    if not password:
        return handle_error('Password is required', 400)
    if not employee:
        return handle_error('Employee not found', 404)

    password_with_pepper = (password + PEPPER).encode('utf-8')
    
    if bcrypt.check_password_hash(employee.password, password_with_pepper):
        token = generate_jwt({'employee_id': employee.employee_id, 'role': 'employee'})
        return jsonify({'message': 'Login successful', 'token': token}), 200
    else:
        return handle_error('Invalid credentials', 400)

# Common Routes
# Logout
@bp.route('/api/users/logout', methods=['POST'])
def logout_user():
    auth_header = request.headers.get('Authorization')
    if auth_header:
        token = auth_header.split(" ")[1]
        blacklist.add(token)
    return handle_success('Logout successful')

# Get personal data
@bp.route('/api/users/me', methods=['GET'])
def get_me():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return handle_error('No authorization token provided', 401)
    
    try:
        token = auth_header.split(" ")[1]
        if blacklist_jwt(token):
            return handle_error('Token has been revoked', 401)
        
        data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        user_id = data.get('customer_id') or data.get('employee_id')
        role = data.get('role')
        
        if role == 'customer' and user_id:
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
        elif role == 'employee' and user_id:
            user = Employees.query.filter_by(employee_id=user_id).first()
            if not user:
                return handle_error('User not found', 404)

            return jsonify({
                'id': user.id,
                'employee_id': user.employee_id,
                'full_name': user.full_name,
                'imgUrl': user.img_url,
            }), 200
        else:
            return handle_error('Invalid role or missing user ID', 401)
        
    except jwt.ExpiredSignatureError:
        return handle_error('Token has expired', 401)
    except jwt.InvalidTokenError:
        return handle_error('Invalid token', 401)
    except Exception as e:
        return handle_error(f"An error occurred: {str(e)}", 500)