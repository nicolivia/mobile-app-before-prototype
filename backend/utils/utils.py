from flask import session, current_app

# Session management for customers
def set_customer_session(customer_id):
    session['customer_id'] = customer_id
    current_app.logger.info(f'Session data: {session}')

def get_customer_session():
    current_app.logger.info(f"Session data on get_session: {session}")
    return session.get('customer_id')

# Session management for employees
def set_staff_session(employee_id):
    session['employee_id'] = employee_id
    current_app.logger.info(f'Session data: {session}')

def get_employee_session():
    current_app.logger.info(f'Session data on get_session: {session}')
    return session.get('employee_id')