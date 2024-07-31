from flask import request, jsonify
from app.app import app, db
from app.models import Contacts
from utils import is_valid_phone

@app.route('/api/contacts/save', methods=['POST'])
def save_contact():
    data = request.get_json()
    contact_id = data.get('id')
    name = data.get('name')
    address = data.get('address')
    phone = data.get('phone')
    
    print(f'Received id: {contact_id}')
    print(f'Contact model ID type: {type(Contacts.id)}')
    
    if contact_id:
        contact = Contacts.query.filter_by(id=contact_id).first()
        if contact:
            # Update contact
            contact.name = name
            contact.address = address
            contact.phone = phone
            db.session.commit()
            return jsonify(contact.to_json()), 200
        else:
            # Add new contact
            new_contact = Contacts(name=name, address=address, phone=phone)
            db.session.add(new_contact)
            db.session.commit()
            return jsonify(new_contact.to_json()), 201