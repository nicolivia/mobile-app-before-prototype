from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# Customers' database schema
class Customers(db.Model):
    __tablename__ = 'customers'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    full_name = db.Column(db.String(80), nullable=True)
    email = db.Column(db.String(345), unique=True, nullable=True)
    phone = db.Column(db.String(20), unique=True, nullable=True)
    dob = db.Column(db.Date, nullable=True)
    ethnicity = db.Column(db.String(20), nullable=True)
    gender = db.Column(db.String(10), nullable=True)
    address = db.Column(db.String(120), nullable=True)
    temporary_password = db.Column(db.String(6), nullable=True)
    password_expiry = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

    def to_json(self):
        return {
            'id': self.id,
            'fullName': self.full_name,
            'email': self.email,
            'phone': self.phone,
            'dob': self.dob,
            'ethnicity': self.ethnicity,
            'gender': self.gender,
            'address': self.address,
            'temporaryPassword': self.temporary_password,
            'passwordExpiry': self.password_expiry,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

# Employees' database schema    
class Employees(db.Model):
    __tablename__ = 'employees'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    employee_id = db.Column(db.String(10), unique=True, nullable=False)
    full_name = db.Column(db.String(80), nullable=False)
    img_url = db.Column(db.String(200), nullable=True)
    password = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    def to_json(self):
        return {
            'id': self.id,
            'employeeId': self.employee_id,
            'fullName': self.full_name,
            'imgUrl': self.img_url,
            'createdAt': self.created_at,
        }
        
# Emergency contacts' database schema    
class Contacts(db.Model):
    __tablename__ = 'contacts'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), nullable=True)
    address = db.Column(db.String(200), nullable=True)
    phone = db.Column(db.String(120), nullable=True)
        
    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'address': self.address,
            'phone': self.phone,
        }
        
# Products' database schema
class Products(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    category_name = db.Column(db.String(80), nullable=False)
    brand_name = db.Column(db.String(80), nullable=False)
    name = db.Column(db.String(80), nullable=False, unique=True)
    price = db.Column(db.Float, nullable=False)
    img_url = db.Column(db.String(200), nullable=True)
    prescription = db.Column(db.Text, nullable=True)
    quantity = db.Column(db.Integer, nullable=False)
    expiry_date = db.Column(db.Date, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

    def to_json(self):
        return {
            'id': self.id,
            'categoryName': self.category_name,
            'brandName': self.brand_name,
            'name': self.name,
            'price': self.price,
            'imgUrl': self.img_url,
            'prescription': self.prescription,
            'quantity': self.quantity,
            'expiryDate': self.expiry_date,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
        }