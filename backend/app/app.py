from flask import Flask
from flask_cors import CORS
from flask_session import Session
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from app.models import db
from app.config import Config
import pymysql

pymysql.install_as_MySQLdb()

app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True, origins=['http://localhost:3000'])

app.config['SESSION_SQLALCHEMY'] = db
Session(app)

migrate = Migrate(app, db)

with app.app_context():
    db.create_all()

from app import auth_routes
from app import contact_routes
from app import product_routes

if __name__ == '__main__':
    app.run(debug=True)