from flask import Flask
from flask_cors import CORS
from flask_session import Session
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from app.models import db
from app.config import Config
import pymysql

pymysql.install_as_MySQLdb()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialise extensions
    db.init_app(app)
    bcrypt = Bcrypt(app)
    CORS(app, supports_credentials=True, origins=['http://localhost:3000'])

    app.config['SESSION_SQLALCHEMY'] = db
    Session(app)

    Migrate(app, db)

    with app.app_context():
        db.create_all()

    # Import and register blueprints
    from app.auth_routes import bp as auth_bp
    app.register_blueprint(auth_bp)

    from app.contact_routes import bp as contact_bp
    app.register_blueprint(contact_bp)

    from app.product_routes import bp as product_bp
    app.register_blueprint(product_bp)

    from app.recognition_routes import bp as recognition_bp
    app.register_blueprint(recognition_bp)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)