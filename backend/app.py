from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import ApplicationConfig

app = Flask(__name__)
app.config.from_object(ApplicationConfig)
CORS(app, supports_credentials=True)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)