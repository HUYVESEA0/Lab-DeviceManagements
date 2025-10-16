from marshmallow import Schema, fields, validate


class RoomSchema(Schema):
    """Schema for Room validation"""
    id = fields.Int(dump_only=True)
    room_number = fields.Int(
        required=True,
        validate=validate.Range(min=1, max=7),
        error_messages={'required': 'Room number is required'}
    )
    name = fields.Str(
        required=True,
        validate=validate.Length(min=1, max=200),
        error_messages={'required': 'Room name is required'}
    )
    description = fields.Str(allow_none=True)
    location = fields.Str(allow_none=True)
    capacity = fields.Int(allow_none=True)
    status = fields.Str(
        validate=validate.OneOf(['available', 'in_use', 'maintenance', 'closed']),
        allow_none=True
    )
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
