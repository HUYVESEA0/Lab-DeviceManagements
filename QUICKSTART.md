# Quick Start Guide

## 🚀 Bắt Đầu Nhanh

### Yêu cầu:
- Python 3.8+
- Modern Web Browser

### 1️⃣ Chuẩn bị Backend

```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt dependencies
pip install -r requirements.txt

# (Tùy chọn) Tạo dữ liệu mẫu
python seed.py

# Chạy Flask server
python run.py
```

Server sẽ chạy tại: **http://localhost:5000**

### 2️⃣ Chuẩn bị Frontend

**Cách 1: Mở trực tiếp**
- Mở file `frontend/index.html` trong browser

**Cách 2: Sử dụng HTTP Server**
```bash
cd frontend
python -m http.server 8000
```
Truy cập: **http://localhost:8000**

### 3️⃣ Sử Dụng Ứng Dụng

1. **Thêm Danh Mục:**
   - Vào "Quản Lý Danh Mục"
   - Nhấn "Thêm Danh Mục"
   - Điền tên, mô tả

2. **Thêm Thiết Bị:**
   - Vào "Quản Lý Thiết Bị"
   - Nhấn "Thêm Thiết Bị"
   - Điền các thông tin bắt buộc (*)
   - Chọn danh mục

3. **Tìm Kiếm & Lọc:**
   - Dùng ô tìm kiếm để tìm theo tên/số seri
   - Lọc theo trạng thái: Sẵn có, Đang sử dụng, Bảo trì, Hỏng
   - Lọc theo danh mục

4. **Chỉnh Sửa:**
   - Nhấn nút sửa (✏️) trên item
   - Thay đổi thông tin
   - Nhấn "Lưu"

5. **Xóa:**
   - Nhấn nút xóa (🗑️) trên item
   - Xác nhận xóa

---

## 🧪 Kiểm Tra Setup

```bash
python setup_check.py
```

---

## 📡 Kiểm Tra API

**Health Check:**
```bash
curl http://localhost:5000/api/health
```

**Lấy danh sách danh mục:**
```bash
curl http://localhost:5000/api/categories
```

**Lấy danh sách thiết bị:**
```bash
curl http://localhost:5000/api/devices
```

---

## 🐛 Troubleshooting

### Frontend không kết nối được API

**Vấn đề:** CORS error, Cannot connect to API

**Giải pháp:**
1. Kiểm tra backend đang chạy: `http://localhost:5000/api/health`
2. Kiểm tra `frontend/js/api.js` có đúng URL
3. Nếu chạy trên máy khác: thay `localhost` bằng IP server

### Database Error

**Vấn đề:** Database file bị lỗi

**Giải pháp:**
```bash
# Xóa file cũ
rm backend/lab_devices.db

# Chạy lại ứng dụng - database sẽ được tạo mới tự động
python run.py

# (Tùy chọn) Tạo lại dữ liệu mẫu
python seed.py
```

### Port bị chiếm dụng

**Vấn đề:** "Address already in use"

**Giải pháp:**
1. Thay đổi port trong `backend/run.py`:
```python
app.run(host='0.0.0.0', port=5001)  # Thay 5001 bằng port khác
```

2. Hoặc set environment variable:
```bash
export PORT=5001
python run.py
```

---

## 📦 Phân Tích Dependencies

| Package | Mục đích |
|---------|---------|
| Flask | Web framework |
| Flask-SQLAlchemy | ORM cho database |
| Flask-CORS | Cho phép cross-origin requests |
| marshmallow | Validation dữ liệu |
| python-dotenv | Load environment variables |

---

## 🔧 Environment Variables

File `.env` trong `backend/`:

```env
FLASK_APP=run.py
FLASK_ENV=development          # Hoặc production
DATABASE_URL=sqlite:///lab_devices.db
SECRET_KEY=your-secret-key     # Thay đổi trong production!
PORT=5000
```

---

## 📚 Tài liệu API Chi Tiết

### Devices Endpoints

**GET /api/devices** - Lấy danh sách (có phân trang)
```bash
curl "http://localhost:5000/api/devices?page=1&per_page=10"
```

**GET /api/devices?status=available** - Lọc theo trạng thái
```bash
curl "http://localhost:5000/api/devices?status=available"
```

**GET /api/devices?search=voltmeter** - Tìm kiếm
```bash
curl "http://localhost:5000/api/devices?search=voltmeter"
```

**GET /api/devices/<id>** - Chi tiết device
```bash
curl http://localhost:5000/api/devices/1
```

**POST /api/devices** - Tạo device
```bash
curl -X POST http://localhost:5000/api/devices \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Máy Đo",
    "serial_number": "SN001",
    "category_id": 1,
    "quantity": 1,
    "status": "available"
  }'
```

**PUT /api/devices/<id>** - Cập nhật device
```bash
curl -X PUT http://localhost:5000/api/devices/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "in_use", "location": "Lab 1"}'
```

**DELETE /api/devices/<id>** - Xóa device
```bash
curl -X DELETE http://localhost:5000/api/devices/1
```

---

**✨ Chúc bạn sử dụng ứng dụng vui vẻ!**
