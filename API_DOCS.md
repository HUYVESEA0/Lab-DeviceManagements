"""
API Documentation and Examples
"""

API_DOCUMENTATION = """
# Lab Device Management API Documentation

## Base URL
http://localhost:5000/api

## Authentication
Currently no authentication required (for development)

---

## Devices Endpoints

### 1. List all devices
**GET** /devices

Query Parameters:
- page (int, default: 1) - Page number
- per_page (int, default: 10) - Items per page
- status (str) - Filter by status: available, in_use, maintenance, broken
- category_id (int) - Filter by category ID
- search (str) - Search by name, serial number, or description

Example:
```
GET /devices?page=1&per_page=10&status=available
GET /devices?search=voltmeter
GET /devices?category_id=1
```

Response:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Máy Đo Điện Áp",
      "serial_number": "SN123456",
      "quantity": 5,
      "status": "available",
      "location": "Tủ A1",
      "model": "DT-830B",
      "description": "Đo điện áp AC/DC",
      "purchase_date": "2024-01-15",
      "category_id": 1,
      "category": "Thiết bị đo lường",
      "created_at": "2024-01-15T10:00:00",
      "updated_at": "2024-01-15T10:00:00"
    }
  ],
  "total": 25,
  "pages": 3,
  "current_page": 1
}
```

---

### 2. Get device by ID
**GET** /devices/{id}

Example:
```
GET /devices/1
```

Response:
```json
{
  "id": 1,
  "name": "Máy Đo Điện Áp",
  "serial_number": "SN123456",
  "quantity": 5,
  "status": "available",
  "location": "Tủ A1",
  "model": "DT-830B",
  "description": "Đo điện áp AC/DC",
  "purchase_date": "2024-01-15",
  "category_id": 1,
  "category": "Thiết bị đo lường",
  "created_at": "2024-01-15T10:00:00",
  "updated_at": "2024-01-15T10:00:00"
}
```

---

### 3. Create device
**POST** /devices

Request Body:
```json
{
  "name": "Máy Đo Điện Áp",
  "serial_number": "SN123456",
  "category_id": 1,
  "model": "DT-830B",
  "description": "Đo điện áp AC/DC",
  "quantity": 5,
  "status": "available",
  "location": "Tủ A1",
  "purchase_date": "2024-01-15"
}
```

Required fields:
- name (string, max 200 chars)
- serial_number (string, max 100 chars, unique)
- category_id (integer)

Optional fields:
- model (string)
- description (string)
- quantity (integer, default: 1, min: 1)
- status (string, default: 'available')
  - Valid: 'available', 'in_use', 'maintenance', 'broken'
- location (string)
- purchase_date (string, format: YYYY-MM-DD)

Response (201 Created):
```json
{
  "id": 1,
  "name": "Máy Đo Điện Áp",
  "serial_number": "SN123456",
  "category_id": 1,
  "model": "DT-830B",
  "description": "Đo điện áp AC/DC",
  "quantity": 5,
  "status": "available",
  "location": "Tủ A1",
  "purchase_date": "2024-01-15",
  "category": "Thiết bị đo lường",
  "created_at": "2024-01-15T10:00:00",
  "updated_at": "2024-01-15T10:00:00"
}
```

Error Response (400):
```json
{
  "errors": {
    "name": ["Name is required"],
    "serial_number": ["Serial number is required"]
  }
}
```

---

### 4. Update device
**PUT** /devices/{id}

Request Body (all fields optional):
```json
{
  "name": "Máy Đo Điện Áp (Updated)",
  "status": "in_use",
  "location": "Phòng Lab 1",
  "quantity": 4
}
```

Response (200 OK):
```json
{
  "id": 1,
  "name": "Máy Đo Điện Áp (Updated)",
  "serial_number": "SN123456",
  "quantity": 4,
  "status": "in_use",
  "location": "Phòng Lab 1",
  "model": "DT-830B",
  "description": "Đo điện áp AC/DC",
  "purchase_date": "2024-01-15",
  "category_id": 1,
  "category": "Thiết bị đo lường",
  "created_at": "2024-01-15T10:00:00",
  "updated_at": "2024-01-15T10:30:00"
}
```

---

### 5. Delete device
**DELETE** /devices/{id}

Response (204 No Content):
```
(no body)
```

---

### 6. Get devices by status
**GET** /devices/status/{status}

Valid status values:
- available
- in_use
- maintenance
- broken

Query Parameters:
- page (int, default: 1)
- per_page (int, default: 10)

Example:
```
GET /devices/status/available?page=1&per_page=10
```

Response:
```json
{
  "data": [...],
  "total": 15,
  "pages": 2,
  "current_page": 1
}
```

---

## Categories Endpoints

### 1. List all categories
**GET** /categories

Query Parameters:
- page (int, default: 1)
- per_page (int, default: 10)

Response:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Thiết bị đo lường",
      "description": "Các thiết bị sử dụng để đo lường",
      "created_at": "2024-01-15T10:00:00",
      "updated_at": "2024-01-15T10:00:00"
    }
  ],
  "total": 4,
  "pages": 1,
  "current_page": 1
}
```

---

### 2. Get category by ID
**GET** /categories/{id}

Response:
```json
{
  "id": 1,
  "name": "Thiết bị đo lường",
  "description": "Các thiết bị sử dụng để đo lường",
  "created_at": "2024-01-15T10:00:00",
  "updated_at": "2024-01-15T10:00:00"
}
```

---

### 3. Create category
**POST** /categories

Request Body:
```json
{
  "name": "Thiết bị đo lường",
  "description": "Các thiết bị sử dụng để đo lường"
}
```

Required fields:
- name (string, max 100 chars)

Optional fields:
- description (string)

Response (201 Created):
```json
{
  "id": 1,
  "name": "Thiết bị đo lường",
  "description": "Các thiết bị sử dụng để đo lường",
  "created_at": "2024-01-15T10:00:00",
  "updated_at": "2024-01-15T10:00:00"
}
```

---

### 4. Update category
**PUT** /categories/{id}

Request Body (all fields optional):
```json
{
  "name": "Thiết bị đo lường (Updated)",
  "description": "Mô tả mới"
}
```

Response (200 OK):
```json
{
  "id": 1,
  "name": "Thiết bị đo lường (Updated)",
  "description": "Mô tả mới",
  "created_at": "2024-01-15T10:00:00",
  "updated_at": "2024-01-15T10:30:00"
}
```

---

### 5. Delete category
**DELETE** /categories/{id}

Note: Deleting a category will also delete all associated devices (cascade delete)

Response (204 No Content):
```
(no body)
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource successfully created |
| 204 | No Content - Resource successfully deleted |
| 400 | Bad Request - Invalid request data |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error |

---

## Error Responses

### Validation Error (400)
```json
{
  "errors": {
    "name": ["Name is required"],
    "serial_number": ["Serial number is required"]
  }
}
```

### Not Found (404)
```json
{
  "message": "404 Not Found"
}
```

### Server Error (500)
```json
{
  "error": "Database error message"
}
```

---

## CURL Examples

### Create a category
```bash
curl -X POST http://localhost:5000/api/categories \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Thiết bị đo lường",
    "description": "Dùng để đo lường"
  }'
```

### Create a device
```bash
curl -X POST http://localhost:5000/api/devices \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Máy Đo Điện Áp",
    "serial_number": "SN123456",
    "category_id": 1,
    "model": "DT-830B",
    "quantity": 5,
    "status": "available",
    "location": "Tủ A1",
    "purchase_date": "2024-01-15",
    "description": "Đo điện áp AC/DC"
  }'
```

### Get all devices with filter
```bash
curl "http://localhost:5000/api/devices?status=available&page=1&per_page=10"
```

### Search devices
```bash
curl "http://localhost:5000/api/devices?search=voltmeter"
```

### Update device status
```bash
curl -X PUT http://localhost:5000/api/devices/1 \\
  -H "Content-Type: application/json" \\
  -d '{
    "status": "in_use",
    "location": "Phòng Lab 1"
  }'
```

### Delete device
```bash
curl -X DELETE http://localhost:5000/api/devices/1
```

---

## Rate Limiting
Not implemented in current version

## Pagination
Default: 10 items per page
Maximum: 100 items per page

---

Last Updated: 2024-01-15
"""

if __name__ == '__main__':
    print(API_DOCUMENTATION)
