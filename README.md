# Lab Device Management System

Ứng dụng web quản lý thiết bị phòng thực hành sử dụng **Flask + SQLAlchemy + REST API**

## Tính Năng

### 📦 Quản Lý Thiết Bị
- ✅ Thêm, sửa, xóa thiết bị
- ✅ Quản lý trạng thái (Sẵn có, Đang sử dụng, Bảo trì, Hỏng)
- ✅ Tìm kiếm theo tên, số seri
- ✅ Lọc theo danh mục, trạng thái
- ✅ Quản lý số lượng, vị trí, ngày mua
- ✅ Phân trang

### 📋 Quản Lý Danh Mục
- ✅ Thêm, sửa, xóa danh mục
- ✅ Phân loại thiết bị theo danh mục

### 🔌 API RESTful
- ✅ Endpoints đầy đủ cho thiết bị và danh mục
- ✅ Validation dữ liệu
- ✅ Xử lý lỗi

### 🎨 Giao Diện
- ✅ Responsive design (Bootstrap 5)
- ✅ Dễ sử dụng
- ✅ Tiếng Việt

## Cấu Trúc Project

```
Lab-DeviceManagements/
├── backend/                 # Flask API Server
│   ├── app/
│   │   ├── models/         # Database Models
│   │   │   ├── device.py
│   │   │   └── category.py
│   │   ├── routes/         # API Routes
│   │   │   ├── device_routes.py
│   │   │   └── category_routes.py
│   │   ├── schemas/        # Validation Schemas
│   │   │   ├── device_schema.py
│   │   │   └── category_schema.py
│   │   └── __init__.py
│   ├── run.py              # Entry point
│   ├── requirements.txt    # Dependencies
│   └── .env               # Environment variables
├── frontend/               # Frontend Web App
│   ├── index.html         # Main HTML
│   ├── js/
│   │   ├── api.js         # API Client
│   │   └── app.js         # Frontend Logic
│   └── css/
│       └── style.css      # Styles
└── README.md
```

## Yêu Cầu Hệ Thống

- Python 3.8+
- pip
- Modern Web Browser

## Cài Đặt

### Backend Setup

1. **Cài đặt dependencies:**
```bash
cd backend
pip install -r requirements.txt
```

2. **Cấu hình environment** (chỉnh sửa `.env` nếu cần):
```bash
FLASK_APP=run.py
FLASK_ENV=development
DATABASE_URL=sqlite:///lab_devices.db
SECRET_KEY=your-secret-key-here
```

3. **Chạy server:**
```bash
python run.py
```
Server sẽ chạy tại `http://localhost:5000`

### Frontend Setup

1. **Mở frontend:**
Đơn giản mở file `frontend/index.html` trong trình duyệt, hoặc sử dụng Live Server

```bash
# Nếu sử dụng Python Simple HTTP Server
cd frontend
python -m http.server 8000
```
Truy cập: `http://localhost:8000`

## API Endpoints

### Thiết Bị (Devices)

| Method | Endpoint | Mô Tả |
|--------|----------|-------|
| GET | `/api/devices` | Lấy danh sách thiết bị |
| GET | `/api/devices/<id>` | Lấy chi tiết thiết bị |
| POST | `/api/devices` | Tạo thiết bị mới |
| PUT | `/api/devices/<id>` | Cập nhật thiết bị |
| DELETE | `/api/devices/<id>` | Xóa thiết bị |
| GET | `/api/devices/status/<status>` | Lọc theo trạng thái |

**Query Parameters:**
- `page`: Số trang (default: 1)
- `per_page`: Số item/trang (default: 10)
- `status`: Lọc theo trạng thái
- `category_id`: Lọc theo danh mục
- `search`: Tìm kiếm theo tên, seri, mô tả

### Danh Mục (Categories)

| Method | Endpoint | Mô Tả |
|--------|----------|-------|
| GET | `/api/categories` | Lấy danh sách danh mục |
| GET | `/api/categories/<id>` | Lấy chi tiết danh mục |
| POST | `/api/categories` | Tạo danh mục mới |
| PUT | `/api/categories/<id>` | Cập nhật danh mục |
| DELETE | `/api/categories/<id>` | Xóa danh mục |

## Mô Hình Dữ Liệu

### Device (Thiết Bị)
```json
{
    "id": 1,
    "name": "Máy Đo Điện Áp",
    "description": "Dùng để đo điện áp AC/DC",
    "model": "DT-830B",
    "serial_number": "SN123456",
    "quantity": 5,
    "status": "available",
    "location": "Tủ A1",
    "purchase_date": "2024-01-15",
    "category_id": 1,
    "category": "Thiết bị đo lường",
    "created_at": "2024-01-15T10:00:00",
    "updated_at": "2024-01-15T10:00:00"
}
```

### Category (Danh Mục)
```json
{
    "id": 1,
    "name": "Thiết bị đo lường",
    "description": "Các thiết bị dùng để đo lường",
    "created_at": "2024-01-15T10:00:00",
    "updated_at": "2024-01-15T10:00:00"
}
```

## Trạng Thái Thiết Bị

| Trạng Thái | Mô Tả |
|-----------|-------|
| `available` | Sẵn có, chưa sử dụng |
| `in_use` | Đang được sử dụng |
| `maintenance` | Đang bảo trì |
| `broken` | Bị hỏng |

## Ví Dụ Sử Dụng API

### Tạo Category
```bash
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "Thiết bị đo lường", "description": "Dùng để đo lường"}'
```

### Tạo Device
```bash
curl -X POST http://localhost:5000/api/devices \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Máy Đo Điện Áp",
    "serial_number": "SN123456",
    "category_id": 1,
    "model": "DT-830B",
    "quantity": 5,
    "status": "available",
    "location": "Tủ A1",
    "purchase_date": "2024-01-15",
    "description": "Dùng để đo điện áp AC/DC"
  }'
```

### Lấy Danh Sách Thiết Bị
```bash
curl http://localhost:5000/api/devices?page=1&per_page=10&status=available
```

### Cập Nhật Thiết Bị
```bash
curl -X PUT http://localhost:5000/api/devices/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "in_use", "location": "Phòng Lab 1"}'
```

## Phát Triển

### Thêm Feature Mới

1. Tạo model mới trong `app/models/`
2. Tạo schema validation trong `app/schemas/`
3. Tạo routes trong `app/routes/`
4. Register blueprint trong `app/__init__.py`

### Database Migration

```bash
# Tạo database mới
python -c "from app import create_app, db; app = create_app(); db.create_all()"
```

## Troubleshooting

### CORS Issues
Nếu frontend không kết nối được backend:
- Đảm bảo Flask chạy trên `http://localhost:5000`
- Kiểm tra `api.js` có URL đúng
- Xem console browser để xem lỗi

### Database Errors
- Xóa file `lab_devices.db` để reset database
- Kiểm tra permissions folder

## Cải Tiến Tương Lai

- [ ] Authentication & Authorization
- [ ] Quản lý người dùng
- [ ] Lịch sử sử dụng thiết bị
- [ ] Export dữ liệu (CSV, Excel)
- [ ] Dashboard thống kê
- [ ] Email notifications
- [ ] Mobile app
- [ ] Unit tests
- [ ] Docker support

## License

MIT License

---

**Ghi chú:** Đây là bản phát triển, không dùng cho production mà không cấu hình bảo mật thích hợp