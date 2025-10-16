from app import db
from datetime import datetime


class Room(db.Model):
    """Room model for lab rooms (1-7)"""
    __tablename__ = 'rooms'
    
    id = db.Column(db.Integer, primary_key=True)
    room_number = db.Column(db.Integer, unique=True, nullable=False, index=True)  # 1-7
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    location = db.Column(db.String(200))  # Building, Floor, etc.
    capacity = db.Column(db.Integer)  # Number of seats/students
    status = db.Column(db.String(50), default='available')  # available, in_use, maintenance, closed
    
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<Room {self.room_number}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'room_number': self.room_number,
            'name': self.name,
            'description': self.description,
            'location': self.location,
            'capacity': self.capacity,
            'status': self.status,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
