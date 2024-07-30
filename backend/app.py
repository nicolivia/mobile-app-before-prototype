from flask import Flask
from flask_cors import CORS
from flask_session import Session
from flask_migrate import Migrate
from models import db
from config import ApplicationConfig, MailConfig

app = Flask(__name__)
app.config.from_object(ApplicationConfig, MailConfig)
db.init_app(app)
CORS(app, supports_credentials=True, origins=['http://localhost:3000'])

# Initialise Redis for session management
Session(app)

migrate = Migrate(app, db)
# Create the database tables
with app.app_context():
    db.create_all()

# Import routes
import routes

if __name__ == '__main__':
    app.run(debug=True)