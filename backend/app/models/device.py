from app import db
from datetime import datetime

class Device(db.Model):
    """Device model for lab equipment management"""
    __tablename__ = 'devices'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False, index=True)
    description = db.Column(db.Text)
    model = db.Column(db.String(100))
    serial_number = db.Column(db.String(100), unique=True, nullable=False)
    quantity = db.Column(db.Integer, default=1, nullable=False)
    status = db.Column(db.String(50), default='available', nullable=False)  # available, in_use, maintenance, broken
    location = db.Column(db.String(200))
    purchase_date = db.Column(db.Date)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey('rooms.id'), nullable=True)  # Optional room assignment
    
    # Relationships
    category = db.relationship('Category', backref='devices', lazy=True)
    room = db.relationship('Room', backref='devices', lazy=True)
    
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<Device {self.name}>'
    
    def to_dict(self):
        room_dict = None
        if self.room:
            room_dict = {
                'id': self.room.id,
                'room_number': self.room.room_number,
                'name': self.room.name,
                'location': self.room.location,
                'capacity': self.room.capacity,
                'status': self.room.status
            }
        
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'model': self.model,
            'serial_number': self.serial_number,
            'quantity': self.quantity,
            'status': self.status,
            'location': self.location,
            'purchase_date': self.purchase_date.isoformat() if self.purchase_date else None,
            'category_id': self.category_id,
            'category': self.category.name if self.category else None,
            'room_id': self.room_id,
            'room': room_dict,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

