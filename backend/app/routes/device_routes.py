from flask import request, jsonify
from app.routes import device_bp
from app import db
from app.models.device import Device
from app.models.category import Category
from marshmallow import ValidationError
from app.schemas.device_schema import DeviceSchema

schema = DeviceSchema()


@device_bp.route('', methods=['GET'])
def get_devices():
    """Get all devices with filtering, sorting and pagination"""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    status = request.args.get('status')
    category_id = request.args.get('category_id', type=int)
    search = request.args.get('search')
    
    query = Device.query
    
    # Filtering
    if status:
        query = query.filter_by(status=status)
    if category_id:
        query = query.filter_by(category_id=category_id)
    if search:
        query = query.filter(
            db.or_(
                Device.name.ilike(f'%{search}%'),
                Device.serial_number.ilike(f'%{search}%'),
                Device.description.ilike(f'%{search}%')
            )
        )
    
    paginated = query.paginate(page=page, per_page=per_page)
    
    return jsonify({
        'data': [device.to_dict() for device in paginated.items],
        'total': paginated.total,
        'pages': paginated.pages,
        'current_page': page
    }), 200


@device_bp.route('/<int:device_id>', methods=['GET'])
def get_device(device_id):
    """Get a specific device"""
    device = Device.query.get_or_404(device_id)
    return jsonify(device.to_dict()), 200


@device_bp.route('', methods=['POST'])
def create_device():
    """Create a new device"""
    try:
        data = schema.load(request.get_json())
    except ValidationError as err:
        return jsonify({'errors': err.messages}), 400
    
    # Check if category exists
    category = Category.query.get(data['category_id'])
    if not category:
        return jsonify(
            {'error': 'Category not found'}
        ), 404
    
    device = Device(
        name=data['name'],
        serial_number=data['serial_number'],
        category_id=data['category_id'],
        description=data.get('description'),
        model=data.get('model'),
        quantity=data.get('quantity', 1),
        status=data.get('status', 'available'),
        location=data.get('location'),
        purchase_date=data.get('purchase_date')
    )
    
    try:
        db.session.add(device)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400
    
    return jsonify(device.to_dict()), 201


@device_bp.route('/<int:device_id>', methods=['PUT'])
def update_device(device_id):
    """Update a device"""
    device = Device.query.get_or_404(device_id)
    
    try:
        data = schema.load(request.get_json(), partial=True)
    except ValidationError as err:
        return jsonify({'errors': err.messages}), 400
    
    # Check category exists if provided
    if 'category_id' in data:
        category = Category.query.get(data['category_id'])
        if not category:
            return jsonify(
                {'error': 'Category not found'}
            ), 404
        device.category_id = data['category_id']
    
    # Update fields
    updatable_fields = [
        'name', 'description', 'model', 'serial_number',
        'quantity', 'status', 'location', 'purchase_date'
    ]
    for field in updatable_fields:
        if field in data:
            setattr(device, field, data[field])
    
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400
    
    return jsonify(device.to_dict()), 200


@device_bp.route('/<int:device_id>', methods=['DELETE'])
def delete_device(device_id):
    """Delete a device"""
    device = Device.query.get_or_404(device_id)
    
    try:
        db.session.delete(device)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400
    
    return '', 204


@device_bp.route('/status/<string:status>', methods=['GET'])
def get_devices_by_status(status):
    """Get devices filtered by status"""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    valid_statuses = [
        'available', 'in_use', 'maintenance', 'broken'
    ]
    if status not in valid_statuses:
        return jsonify(
            {'error': f'Invalid status. Valid: {valid_statuses}'}
        ), 400
    
    query = Device.query.filter_by(status=status)
    paginated = query.paginate(page=page, per_page=per_page)
    
    return jsonify({
        'data': [device.to_dict() for device in paginated.items],
        'total': paginated.total,
        'pages': paginated.pages,
        'current_page': page
    }), 200
