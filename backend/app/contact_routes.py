from flask import Blueprint, request, jsonify
from app.app import db
from app.models import Contacts
from utils.validation import is_valid_phone
from utils.status import handle_error, handle_success

bp = Blueprint('contact', __name__)

@bp.route('/api/contacts/save/<int:id>', methods=['POST'])
def save_contact():
    data = request.get_json()
    contact_id = data.get('id')
    name = data.get('name')
    address = data.get('address')
    phone = data.get('phone')
    
    if not is_valid_phone(phone):
        return handle_error('Invalid phone number format', 400)

    try:
        if contact_id:
            contact = Contacts.query.filter_by(id=contact_id).first()
            if contact:
                # Update contact
                contact.name = name
                contact.address = address
                contact.phone = phone
                db.session.commit()
                return handle_success('Updated successfully')
            else:
                # Add new contact
                new_contact = Contacts(name=name, address=address, phone=phone)
                db.session.add(new_contact)
                db.session.commit()
                return jsonify(new_contact.to_json()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500