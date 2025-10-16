# 📊 Hướng Dẫn Hoàn Chỉnh - Lab Device Management System

## 🎯 Tổng Quan Dự Án

Ứng dụng web Flask quản lý thiết bị phòng thực hành với đầy đủ:
- ✅ REST API backend
- ✅ Frontend SPA (Single Page Application)
- ✅ Database SQLite
- ✅ Validation dữ liệu
- ✅ Giao diện responsive

---

## 📁 Cấu Trúc Dự Án

```
Lab-DeviceManagements/
│
├── README.md                   # Tài liệu chính
├── QUICKSTART.md              # Bắt đầu nhanh
├── API_DOCS.md                # Tài liệu API
├── setup_check.py             # Kiểm tra setup
│
├── backend/                    # Flask Server
│   ├── run.py                 # Entry point
│   ├── config.py              # Configuration
│   ├── seed.py                # Dữ liệu mẫu
│   ├── requirements.txt       # Dependencies
│   ├── .env                   # Environment variables
│   ├── .gitignore            # Git ignore
│   │
│   └── app/
│       ├── __init__.py        # App factory
│       ├── models/
│       │   ├── __init__.py
│       │   ├── device.py      # Device model
│       │   └── category.py    # Category model
│       ├── routes/
│       │   ├── __init__.py
│       │   ├── device_routes.py
│       │   └── category_routes.py
│       └── schemas/
│           ├── __init__.py
│           ├── device_schema.py
│           └── category_schema.py
│
├── frontend/                   # Web App
│   ├── index.html             # Main UI
│   ├── js/
│   │   ├── api.js             # API client
│   │   └── app.js             # Application logic
│   └── css/
│       └── style.css          # Styling
│
├── run_backend.bat            # Windows startup
└── run_backend.sh             # Linux/Mac startup
```

---

## 🚀 Bắt Đầu Nhanh

### **Windows**
```batch
cd backend
pip install -r requirements.txt
python seed.py
python run.py
```

Mở `frontend/index.html` hoặc:
```batch
cd frontend
python -m http.server 8000
```

### **Linux/Mac**
```bash
cd backend
pip install -r requirements.txt
python seed.py
python run.py
```

---

## 🔌 API Endpoints

### Devices (Thiết Bị)
| Phương Thức | URL | Mô Tả |
|-------------|-----|-------|
| GET | `/api/devices` | Lấy danh sách |
| GET | `/api/devices/<id>` | Chi tiết |
| POST | `/api/devices` | Tạo mới |
| PUT | `/api/devices/<id>` | Cập nhật |
| DELETE | `/api/devices/<id>` | Xóa |
| GET | `/api/devices/status/<status>` | Lọc trạng thái |

### Categories (Danh Mục)
| Phương Thức | URL | Mô Tả |
|-------------|-----|-------|
| GET | `/api/categories` | Lấy danh sách |
| GET | `/api/categories/<id>` | Chi tiết |
| POST | `/api/categories` | Tạo mới |
| PUT | `/api/categories/<id>` | Cập nhật |
| DELETE | `/api/categories/<id>` | Xóa |

---

## 📦 Mô Hình Dữ Liệu

### Device (Thiết Bị)
```
id: integer (primary key)
name: string (required, max 200)
description: text
model: string
serial_number: string (required, unique, max 100)
quantity: integer (default: 1)
status: string (available, in_use, maintenance, broken)
location: string
purchase_date: date
category_id: integer (foreign key)
created_at: datetime
updated_at: datetime
```

### Category (Danh Mục)
```
id: integer (primary key)
name: string (required, unique, max 100)
description: text
created_at: datetime
updated_at: datetime
```

---

## 🎨 Tính Năng Frontend

### Giao Diện Chính
- **Quản Lý Thiết Bị**: Danh sách, tìm kiếm, lọc, thêm, sửa, xóa
- **Quản Lý Danh Mục**: Danh sách, thêm, sửa, xóa
- **Responsive Design**: Hoạt động trên desktop, tablet, mobile

### Tính Năng Tìm Kiếm & Lọc
- Tìm kiếm theo tên, số seri, mô tả
- Lọc theo trạng thái
- Lọc theo danh mục
- Phân trang

---

## 💾 Database

### SQLite
- File: `backend/lab_devices.db`
- Tự động tạo khi khởi động
- Dễ backup, không cần server

### Migrations
```bash
# Xóa và tạo mới
rm backend/lab_devices.db
python backend/run.py

# Thêm dữ liệu mẫu
python backend/seed.py
```

---

## 🔐 Environment Variables

File `.env` trong `backend/`:
```env
FLASK_APP=run.py
FLASK_ENV=development
DATABASE_URL=sqlite:///lab_devices.db
SECRET_KEY=dev-secret-key
PORT=5000
```

### Production Setup
```env
FLASK_ENV=production
SECRET_KEY=your-very-secret-key-here
DATABASE_URL=postgresql://user:pass@host/db
```

---

## 📝 Validation Rules

### Device
- `name`: Bắt buộc, 1-200 ký tự
- `serial_number`: Bắt buộc, duy nhất, 1-100 ký tự
- `category_id`: Bắt buộc, phải tồn tại
- `quantity`: ≥ 1
- `status`: Phải nằm trong [available, in_use, maintenance, broken]

### Category
- `name`: Bắt buộc, 1-100 ký tự, duy nhất

---

## 🧪 Test API

### Kiểm Tra Health
```bash
curl http://localhost:5000/api/health
```

### Tạo Category
```bash
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name":"Thiết bị đo","description":"Dùng để đo"}'
```

### Tạo Device
```bash
curl -X POST http://localhost:5000/api/devices \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Máy Đo",
    "serial_number":"SN001",
    "category_id":1,
    "quantity":5
  }'
```

### Lọc Device
```bash
curl "http://localhost:5000/api/devices?status=available&page=1"
```

---

## 🐛 Troubleshooting

### CORS Error
**Vấn đề**: "Access to XMLHttpRequest blocked by CORS"

**Giải pháp**:
- Kiểm tra backend chạy tại `http://localhost:5000`
- Kiểm tra `frontend/js/api.js` có URL đúng
- Xem browser console để chi tiết lỗi

### Cannot Connect to Database
**Vấn đề**: "sqlite3 operational error"

**Giải pháp**:
```bash
# Xóa database cũ
rm backend/lab_devices.db

# Chạy lại app
python backend/run.py
```

### Port Already in Use
**Vấn đề**: "Address already in use"

**Giải pháp**:
Sửa trong `backend/run.py`:
```python
app.run(port=5001)  # Thay port
```

---

## 📚 Phát Triển Thêm

### Thêm Field Mới cho Device
1. Sửa `backend/app/models/device.py` - thêm column
2. Sửa `backend/app/schemas/device_schema.py` - thêm field validation
3. Sửa `backend/app/routes/device_routes.py` - cập nhật logic
4. Xóa database và tạo mới: `rm lab_devices.db`

### Thêm Endpoint Mới
1. Tạo route trong `backend/app/routes/`
2. Register blueprint trong `backend/app/__init__.py`
3. Test với CURL hoặc Postman

### Deploy Production
1. Sử dụng Gunicorn: `pip install gunicorn`
   ```bash
   gunicorn -w 4 run:app
   ```
2. Sử dụng Nginx/Apache làm reverse proxy
3. Sử dụng PostgreSQL thay SQLite
4. Set `FLASK_ENV=production`

---

## 📖 Tài Liệu Tham Khảo

- **Flask**: https://flask.palletsprojects.com/
- **SQLAlchemy**: https://sqlalchemy.org/
- **Marshmallow**: https://marshmallow.readthedocs.io/
- **Bootstrap 5**: https://getbootstrap.com/

---

## 💡 Best Practices Được Áp Dụng

✅ **Backend**:
- MVC architecture (Models, Routes/Controllers, Schemas)
- Validation dữ liệu với Marshmallow
- Error handling
- CORS support
- Pagination

✅ **Frontend**:
- Vanilla JavaScript (no framework)
- API wrapper pattern
- Responsive design
- Event-driven
- Modal dialogs

✅ **Database**:
- Foreign key relationships
- Timestamps (created_at, updated_at)
- Unique constraints
- Cascade delete

---

## 📊 Stats

- **Backend Files**: 12 files
- **Frontend Files**: 4 files
- **Lines of Code**: ~2000 lines
- **API Endpoints**: 11 endpoints
- **Database Tables**: 2 tables

---

## 🎓 Học Tập từ Dự Án

Dự án này dạy bạn:
1. Xây dựng REST API với Flask
2. Database design với SQLAlchemy
3. Frontend SPA development
4. Validation dữ liệu
5. Error handling
6. CORS configuration
7. Pagination

---

## 📞 Support

Nếu gặp vấn đề:
1. Đọc QUICKSTART.md
2. Xem API_DOCS.md
3. Chạy setup_check.py để kiểm tra
4. Xem browser console để lỗi frontend
5. Xem terminal backend để lỗi server

---

**Happy Coding! 🚀**

Last Updated: January 2024
Version: 1.0
