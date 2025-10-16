from flask import Blueprint

device_bp = Blueprint('devices', __name__)
category_bp = Blueprint('categories', __name__)

from app.routes import device_routes, category_routes
