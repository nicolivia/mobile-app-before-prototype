from flask import request, jsonify
from app.app import app, db
from app.models import Products, ProductImage
from utils.status import handle_error, handle_success
from datetime import datetime

@app.route('/api/products/create', methods=['POST'])
def create_product():
    data = request.get_json()
    product_id = data.get('product_id')
    category_name = data.get('category_name')
    brand_name = data.get('brand_name')
    name = data.get('name')
    price = data.get('price')
    img_urls = data.get('img_urls', [])
    prescription = data.get('prescription')
    quantity = data.get('quantity')
    expiry_date = data.get('expiry_date')
    existing_product = Products.query.filter_by(product_id=product_id).first()
    
    if not all([product_id, category_name, brand_name, name, price, prescription, quantity, expiry_date]):
        return handle_error('All fields are required.', 400)
    
    if existing_product:
        return handle_error('A product with this product ID already exists.', 409)
    
    new_product = Products(
        product_id=product_id,
        category_name=category_name,
        brand_name=brand_name,
        name=name,
        price=price,
        prescription=prescription,
        quantity=quantity,
        expiry_date=datetime.strptime(expiry_date, '%Y-%m-%d')
    )
    db.session.add(new_product)
    db.session.commit()
    
    # Add more images if provided
    for url in img_urls:
        new_image = ProductImage(product_id=new_product.id, img_url=url)
        db.session.add(new_image)
    db.session.commit()
    
    return jsonify(new_product.to_json()), 201
    
@app.route('/api/products/update/<int:id>', methods=['PUT'])
def update_product(id):
    data = request.get_json()
    product = Products.query.get(id)
    
    if not product:
        return handle_error('Product not found.', 404)
    
    product.product_id = data.get('product_id', product.product_id)
    product.category_name = data.get('category_name', product.category_name)
    product.brand_name = data.get('brand_name', product.brand_name)
    product.name = data.get('name', product.name)
    product.price = data.get('price', product.price)
    product.prescription = data.get('prescription', product.prescription)
    product.quantity = data.get('quantity', product.quantity)
    product.expiry_date = datetime.strptime(data.get('expiry_date', product.expiry_date.strftime('%Y-%m-%d')), '%Y-%m-%d')
    db.session.commit()
    
    return jsonify(product.to_json()), 200
    
@app.route('/api/products/all', methods=['GET'])
def get_all_products():
    products = Products.query.all()
    return jsonify([product.to_json() for product in products]), 200

@app.route('/api/products/<int:id>', methods=['GET'])
def get_product(id):
    product = Products.query.get(id)

    if not product:
        return handle_error('Product not found.', 404)

    return jsonify(product.to_json()), 200
    
@app.route('/api/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Products.query.get(id)
    
    if not product:
        return handle_error('Product not found.', 404)
    
    db.session.delete(product)
    db.session.commit()
    
    return handle_success('Product deleted successfully.')