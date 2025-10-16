from flask import request, jsonify
from app.routes import room_bp
from app import db
from app.models.room import Room
from marshmallow import ValidationError


@room_bp.route('', methods=['GET'])
def get_rooms():
    """Get all rooms with optional filtering"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        status = request.args.get('status')
        
        query = Room.query
        
        # Filter by status if provided
        if status:
            query = query.filter_by(status=status)
        
        # Order by room number
        paginated = query.order_by(Room.room_number).paginate(page=page, per_page=per_page)
        
        return jsonify({
            'data': [room.to_dict() for room in paginated.items],
            'total': paginated.total,
            'pages': paginated.pages,
            'current_page': page
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@room_bp.route('/<int:room_id>', methods=['GET'])
def get_room(room_id):
    """Get a specific room"""
    try:
        room = Room.query.get_or_404(room_id)
        return jsonify(room.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 404


@room_bp.route('', methods=['POST'])
def create_room():
    """Create a new room"""
    try:
        data = request.get_json()
        
        if not data or not data.get('room_number') or not data.get('name'):
            return jsonify({'error': 'room_number and name are required'}), 400
        
        # Check if room number already exists
        if Room.query.filter_by(room_number=data['room_number']).first():
            return jsonify({'error': f"Room {data['room_number']} already exists"}), 400
        
        room = Room(
            room_number=data['room_number'],
            name=data['name'],
            description=data.get('description'),
            location=data.get('location'),
            capacity=data.get('capacity'),
            status=data.get('status', 'available')
        )
        
        db.session.add(room)
        db.session.commit()
        
        return jsonify(room.to_dict()), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@room_bp.route('/<int:room_id>', methods=['PUT'])
def update_room(room_id):
    """Update a room"""
    try:
        room = Room.query.get_or_404(room_id)
        data = request.get_json()
        
        # Update fields if provided
        if 'name' in data:
            room.name = data['name']
        if 'description' in data:
            room.description = data['description']
        if 'location' in data:
            room.location = data['location']
        if 'capacity' in data:
            room.capacity = data['capacity']
        if 'status' in data:
            room.status = data['status']
        
        db.session.commit()
        
        return jsonify(room.to_dict()), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@room_bp.route('/<int:room_id>', methods=['DELETE'])
def delete_room(room_id):
    """Delete a room"""
    try:
        room = Room.query.get_or_404(room_id)
        
        db.session.delete(room)
        db.session.commit()
        
        return '', 204
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@room_bp.route('/number/<int:room_number>', methods=['GET'])
def get_room_by_number(room_number):
    """Get room by room number (1-7)"""
    try:
        room = Room.query.filter_by(room_number=room_number).first_or_404()
        return jsonify(room.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 404
