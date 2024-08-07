from flask import Blueprint, request, jsonify
from app.app import db
from app.models import Products, ProductImage
from utils.status import handle_error, handle_success
from datetime import datetime

bp = Blueprint('product', __name__)

@bp.route('/api/products/create', methods=['POST'])
def create_product():
    data = request.get_json()
    new_product = Products(
        product_name=data.get('productName'),
        brand_name=data.get('brandName'),
        generic_name=data.get('genericName'),
        manufacturer=data.get('manufacturer'),
        price=data.get('price'),
        stock=data.get('stock'),
        since=datetime.strptime(data.get('since'), '%Y-%m-%d') if data.get('since') else None,
        updated=datetime.strptime(data.get('updated'), '%Y-%m-%d') if data.get('updated') else None,
        active_ingredients=data.get('activeIngredients'),
        inactive_ingredients=data.get('inactiveIngredients'),
        therapeutic_class=data.get('therapeuticClass'),
        formulation=data.get('formulation'),
        systemic_category=data.get('systemicCategory'),
        usage_duration=data.get('usageDuration'),
        target_population=data.get('targetPopulation'),
        drug_class=data.get('drugClass'),
        strength=data.get('strength'),
        dosage=data.get('dosage'),
        route_of_administration=data.get('routeOfAdministration'),
        indications=data.get('indications'),
        contraindications=data.get('contraindications'),
        side_effects=data.get('sideEffects'),
        interactions=data.get('interactions'),
        warnings=data.get('warnings'),
        storage_conditions=data.get('storageConditions'),
        approval_date=datetime.strptime(data.get('approvalDate'), '%Y-%m-%d') if data.get('approvalDate') else None,
        expiry_date=datetime.strptime(data.get('expiryDate'), '%Y-%m-%d'),
        batch_number=data.get('batchNumber'),
        description=data.get('description')
    )
    
    db.session.add(new_product)
    db.session.commit()
    
    img_urls = data.get('img_urls', [])
    for url in img_urls:
        new_image = ProductImage(product_id=new_product.id, img_url=url)
        db.session.add(new_image)
    db.session.commit()
    
    return jsonify(new_product.to_json()), 201
    
@bp.route('/api/products/update/<int:id>', methods=['PUT'])
def update_product(id):
    data = request.get_json()
    product = Products.query.get(id)
    
    if not product:
        return handle_error('Product not found.', 404)
    
    product.product_name = data.get('productName', product.product_name)
    product.brand_name = data.get('brandName', product.brand_name)
    product.generic_name = data.get('genericName', product.generic_name)
    product.manufacturer = data.get('manufacturer', product.manufacturer)
    product.price = data.get('price', product.price)
    product.stock = data.get('stock', product.stock)
    product.since = datetime.strptime(data.get('since'), '%Y-%m-%d') if data.get('since') else product.since
    product.updated = datetime.strptime(data.get('updated'), '%Y-%m-%d') if data.get('updated') else product.updated
    product.active_ingredients = data.get('activeIngredients', product.active_ingredients)
    product.inactive_ingredients = data.get('inactiveIngredients', product.inactive_ingredients)
    product.therapeutic_class = data.get('therapeuticClass', product.therapeutic_class)
    product.formulation = data.get('formulation', product.formulation)
    product.systemic_category = data.get('systemicCategory', product.systemic_category)
    product.usage_duration = data.get('usageDuration', product.usage_duration)
    product.target_population = data.get('targetPopulation', product.target_population)
    product.drug_class = data.get('drugClass', product.drug_class)
    product.strength = data.get('strength', product.strength)
    product.dosage = data.get('dosage', product.dosage)
    product.route_of_administration = data.get('routeOfAdministration', product.route_of_administration)
    product.indications = data.get('indications', product.indications)
    product.contraindications = data.get('contraindications', product.contraindications)
    product.side_effects = data.get('sideEffects', product.side_effects)
    product.interactions = data.get('interactions', product.interactions)
    product.warnings = data.get('warnings', product.warnings)
    product.storage_conditions = data.get('storageConditions', product.storage_conditions)
    product.approval_date = datetime.strptime(data.get('approvalDate'), '%Y-%m-%d') if data.get('approvalDate') else product.approval_date
    product.expiry_date = datetime.strptime(data.get('expiryDate'), '%Y-%m-%d')
    product.batch_number = data.get('batchNumber', product.batch_number)
    product.description = data.get('description', product.description)
    db.session.commit()
    
    return jsonify(product.to_json()), 200
    
@bp.route('/api/products/all', methods=['GET'])
def get_all_products():
    products = Products.query.all()
    return jsonify([product.to_json() for product in products]), 200

@bp.route('/api/products/<int:id>', methods=['GET'])
def get_product(id):
    product = Products.query.get(id)

    if not product:
        return handle_error('Product not found.', 404)

    return jsonify(product.to_json()), 200
    
@bp.route('/api/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Products.query.get(id)
    
    if not product:
        return handle_error('Product not found.', 404)
    
    db.session.delete(product)
    db.session.commit()
    
    return handle_success('Product deleted successfully.')