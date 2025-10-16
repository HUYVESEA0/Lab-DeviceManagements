from flask import request, jsonify
from app.routes import category_bp
from app import db
from app.models.category import Category
from marshmallow import ValidationError
from app.schemas.category_schema import CategorySchema

schema = CategorySchema()


@category_bp.route('', methods=['GET'])
def get_categories():
    """Get all categories with pagination"""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    paginated = Category.query.paginate(page=page, per_page=per_page)
    
    return jsonify({
        'data': [cat.to_dict() for cat in paginated.items],
        'total': paginated.total,
        'pages': paginated.pages,
        'current_page': page
    }), 200


@category_bp.route('/<int:category_id>', methods=['GET'])
def get_category(category_id):
    """Get a specific category"""
    category = Category.query.get_or_404(category_id)
    return jsonify(category.to_dict()), 200


@category_bp.route('', methods=['POST'])
def create_category():
    """Create a new category"""
    try:
        data = schema.load(request.get_json())
    except ValidationError as err:
        return jsonify({'errors': err.messages}), 400
    
    category = Category(name=data['name'], description=data.get('description'))
    
    try:
        db.session.add(category)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400
    
    return jsonify(category.to_dict()), 201


@category_bp.route('/<int:category_id>', methods=['PUT'])
def update_category(category_id):
    """Update a category"""
    category = Category.query.get_or_404(category_id)
    
    try:
        data = schema.load(request.get_json(), partial=True)
    except ValidationError as err:
        return jsonify({'errors': err.messages}), 400
    
    if 'name' in data:
        category.name = data['name']
    if 'description' in data:
        category.description = data['description']
    
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400
    
    return jsonify(category.to_dict()), 200


@category_bp.route('/<int:category_id>', methods=['DELETE'])
def delete_category(category_id):
    """Delete a category"""
    category = Category.query.get_or_404(category_id)
    
    try:
        db.session.delete(category)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400
    
    return '', 204
