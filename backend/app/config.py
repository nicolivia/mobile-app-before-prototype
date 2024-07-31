import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Flask-Session configuration
    SESSION_TYPE = 'sqlalchemy'
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_SQLALCHEMY_TABLE = 'sessions'
    
    # Database configuration
    DEBUG = False
    SECRET_KEY = os.getenv('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    
    # Mail configuration
    MAIL_DEBUG = False
    MAIL_DEFAULT_SENDER = os.getenv('MAIL_DEFAULT_SENDER')
    MAIL_SERVER = os.getenv('MAIL_SERVER')
    MAIL_PORT = int(os.getenv('MAIL_PORT'))
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    
    # Twilio configuration
    TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
    TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
    TWILIO_SERVICE_SID = os.getenv('TWILIO_SERVICE_SID')
    PHONE_NUMBER = os.getenv('PHONE_NUMBER')
    SENDGRID_API_KEY=os.getenv('SENDGRID_API_KEY')