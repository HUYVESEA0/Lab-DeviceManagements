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
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    app.config['SESSION_COOKIE_SECURE'] = False  # Set to True in production with HTTPS
    app.config['SESSION_COOKIE_HTTPONLY'] = True
    app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
    app.config['PERMANENT_SESSION_LIFETIME'] = 3600  # 1 hour
    
    # Initialize extensions
    db.init_app(app)
    CORS(app, supports_credentials=True)
    
    # Create tables
    with app.app_context():
        db.create_all()
    
    # Register blueprints
    from app.routes import device_bp, category_bp, auth_bp, room_bp
    app.register_blueprint(device_bp, url_prefix='/api/devices')
    app.register_blueprint(category_bp, url_prefix='/api/categories')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(room_bp, url_prefix='/api/rooms')
    
    @app.route('/')
    def index():
        return {'message': 'Lab Device Management API', 'version': '2.0', 'status': 'running'}, 200
    
    @app.route('/api/health')
    def health():
        return {'status': 'ok'}, 200
    
    return app
