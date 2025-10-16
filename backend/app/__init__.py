from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

db = SQLAlchemy()

def create_app():
    """Application factory"""
    app = Flask(__name__)
    
    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///lab_devices.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')
    
    # Initialize extensions
    db.init_app(app)
    CORS(app)
    
    # Create tables
    with app.app_context():
        db.create_all()
    
    # Register blueprints
    from app.routes import device_bp, category_bp
    app.register_blueprint(device_bp, url_prefix='/api/devices')
    app.register_blueprint(category_bp, url_prefix='/api/categories')
    
    @app.route('/')
    def index():
        return {'message': 'Lab Device Management API', 'version': '1.0', 'status': 'running'}, 200
    
    @app.route('/api/health')
    def health():
        return {'status': 'ok'}, 200
    
    return app
