from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

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

class Products(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    product_name = db.Column(db.String(80), nullable=False)
    brand_name = db.Column(db.String(80), nullable=False)
    generic_name = db.Column(db.String(80), nullable=True)
    manufacturer = db.Column(db.String(80), nullable=True)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    since = db.Column(db.DateTime, nullable=True)
    updated = db.Column(db.DateTime, nullable=True)
    active_ingredients = db.Column(db.Text, nullable=True)
    inactive_ingredients = db.Column(db.Text, nullable=True)
    therapeutic_class = db.Column(db.String(80), nullable=True)
    formulation = db.Column(db.String(80), nullable=True)
    systemic_category = db.Column(db.String(80), nullable=True)
    usage_duration = db.Column(db.String(80), nullable=True)
    target_population = db.Column(db.String(80), nullable=True)
    drug_class = db.Column(db.String(80), nullable=True)
    strength = db.Column(db.String(80), nullable=True)
    dosage = db.Column(db.String(80), nullable=True)
    route_of_administration = db.Column(db.String(80), nullable=True)
    indications = db.Column(db.Text, nullable=True)
    contraindications = db.Column(db.Text, nullable=True)
    side_effects = db.Column(db.Text, nullable=True)
    interactions = db.Column(db.Text, nullable=True)
    warnings = db.Column(db.Text, nullable=True)
    storage_conditions = db.Column(db.Text, nullable=True)
    approval_date = db.Column(db.DateTime, nullable=True)
    expiry_date = db.Column(db.DateTime, nullable=False)
    batch_number = db.Column(db.String(80), nullable=True)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

    images = db.relationship('ProductImage', backref='product', lazy=True)

    def to_json(self):
        return {
            'id': self.id,
            'productName': self.product_name,
            'brandName': self.brand_name,
            'genericName': self.generic_name,
            'manufacturer': self.manufacturer,
            'price': self.price,
            'stock': self.stock,
            'since': self.since,
            'updated': self.updated,
            'activeIngredients': self.active_ingredients,
            'inactiveIngredients': self.inactive_ingredients,
            'therapeuticClass': self.therapeutic_class,
            'formulation': self.formulation,
            'systemicCategory': self.systemic_category,
            'usageDuration': self.usage_duration,
            'targetPopulation': self.target_population,
            'drugClass': self.drug_class,
            'strength': self.strength,
            'dosage': self.dosage,
            'routeOfAdministration': self.route_of_administration,
            'indications': self.indications,
            'contraindications': self.contraindications,
            'sideEffects': self.side_effects,
            'interactions': self.interactions,
            'warnings': self.warnings,
            'storageConditions': self.storage_conditions,
            'approvalDate': self.approval_date,
            'expiryDate': self.expiry_date,
            'batchNumber': self.batch_number,
            'description': self.description,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'images': [image.to_json() for image in self.images]
        }

class ProductImage(db.Model):
    __tablename__ = 'product_images'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    img_url = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    def to_json(self):
        return {
            'id': self.id,
            'imgUrl': self.img_url,
            'createdAt': self.created_at,
        }