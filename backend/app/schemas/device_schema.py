from marshmallow import Schema, fields, validate

class DeviceSchema(Schema):
    """Schema for Device validation"""
    id = fields.Int(dump_only=True)
    name = fields.Str(
        required=True,
        validate=validate.Length(min=1, max=200),
        error_messages={'required': 'Device name is required'}
    )
    description = fields.Str(allow_none=True)
    model = fields.Str(allow_none=True)
    serial_number = fields.Str(
        required=True,
        validate=validate.Length(min=1, max=100),
        error_messages={'required': 'Serial number is required'}
    )
    quantity = fields.Int(validate=validate.Range(min=1), allow_none=True)
    status = fields.Str(
        validate=validate.OneOf(['available', 'in_use', 'maintenance', 'broken']),
        allow_none=True
    )
    location = fields.Str(allow_none=True)
    purchase_date = fields.Date(allow_none=True)
    category_id = fields.Int(required=True, error_messages={'required': 'Category ID is required'})
    category = fields.Str(dump_only=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
