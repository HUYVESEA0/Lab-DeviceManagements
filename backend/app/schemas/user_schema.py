from marshmallow import Schema, fields, validate


class UserSchema(Schema):
    """Schema for User validation"""
    id = fields.Int(dump_only=True)
    username = fields.Str(
        required=True,
        validate=validate.Length(min=3, max=80),
        error_messages={'required': 'Username is required'}
    )
    password = fields.Str(
        required=True,
        load_only=True,
        validate=validate.Length(min=6),
        error_messages={'required': 'Password is required'}
    )
    full_name = fields.Str(allow_none=True)
    email = fields.Email(allow_none=True)
    role = fields.Str(
        validate=validate.OneOf(['staff', 'manager', 'admin']),
        allow_none=True
    )
    is_active = fields.Bool(allow_none=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
