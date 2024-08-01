from app.models import Customers, Employees
import re

def is_valid_email(email):
    return re.match(r"[^@]+@[^@]+\.[^@]+", email)

def is_valid_phone(phone):
    return re.match(r"^\+?[1-9]\d{1,14}$", phone)

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