# 🏥 Lab Device Management System

## 📖 Danh Sách Tài Liệu & Hướng Dẫn

Chào mừng bạn đến với dự án quản lý thiết bị phòng thực hành! Dưới đây là danh sách toàn bộ tài liệu để bạn bắt đầu:

---

## 🚀 Bắt Đầu Nhanh (5 phút)

**👉 Đọc trước: [QUICKSTART.md](QUICKSTART.md)**

Hướng dẫn nhanh để:
- Cài đặt dependencies
- Chạy backend server
- Mở frontend
- Sử dụng ứng dụng

---

## 📚 Tài Liệu Chính

### 1. [README.md](README.md) - Tài liệu chi tiết
   - Tính năng đầy đủ
   - Cấu trúc project
   - Setup instructions
   - API endpoints
   - Troubleshooting

### 2. [GUIDE.md](GUIDE.md) - Hướng dẫn toàn diện
   - Tổng quan dự án
   - Cấu trúc chi tiết
   - Best practices
   - Validation rules
   - Ví dụ test API

### 3. [API_DOCS.md](API_DOCS.md) - Tài liệu API
   - Tất cả endpoints
   - Request/Response examples
   - Query parameters
   - Error codes
   - CURL examples

### 4. [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Tóm tắt dự án
   - File tạo được
   - Features overview
   - Stats
   - Next steps

---

## 🔧 Công Cụ & Scripts

### Setup Check
```bash
python setup_check.py
```
Kiểm tra toàn bộ setup trước khi chạy

### Seed Database
```bash
cd backend
python seed.py
```
Tạo dữ liệu mẫu (4 categories, 10 devices)

### Startup Scripts
- **Windows**: `run_backend.bat`
- **Linux/Mac**: `run_backend.sh`

---

## 📂 Cấu Trúc Thư Mục

```
Lab-DeviceManagements/
│
├── 📄 Tài liệu
│   ├── README.md           ← Bắt đầu từ đây
│   ├── QUICKSTART.md       ← Hoặc bắt đầu nhanh
│   ├── GUIDE.md            ← Hướng dẫn chi tiết
│   ├── API_DOCS.md         ← API reference
│   └── PROJECT_SUMMARY.md  ← Tóm tắt
│
├── 🔙 Backend
│   ├── run.py              ← Chạy: python run.py
│   ├── config.py           ← Cấu hình
│   ├── seed.py             ← Dữ liệu mẫu
│   ├── requirements.txt    ← Dependencies
│   ├── .env                ← Environment variables
│   └── app/                ← Flask application
│
├── 🎨 Frontend
│   ├── index.html          ← Mở trong browser
│   ├── js/                 ← JavaScript
│   └── css/                ← Styling
│
└── 🛠️ Tools
    ├── setup_check.py      ← Kiểm tra setup
    ├── run_backend.bat     ← Windows startup
    └── run_backend.sh      ← Linux/Mac startup
```

---

## ⚡ Quick Commands

### Setup
```bash
cd backend
pip install -r requirements.txt
python seed.py
```

### Run Backend
```bash
python run.py
# Server tại http://localhost:5000
```

### Run Frontend
```bash
cd frontend
python -m http.server 8000
# Truy cập http://localhost:8000
# Hoặc mở index.html trực tiếp
```

### Test API
```bash
curl http://localhost:5000/api/health
curl http://localhost:5000/api/devices
curl http://localhost:5000/api/categories
```

---

## 🎓 Học Tập

Dự án này dạy bạn:

✅ **Backend**
- Flask web framework
- SQLAlchemy ORM
- Marshmallow validation
- REST API design
- Error handling

✅ **Frontend**
- Vanilla JavaScript
- Fetch API
- DOM manipulation
- Responsive design
- Event handling

✅ **Database**
- SQLite
- Relationships
- Constraints
- Migrations

---

## 🎯 Roadmap

### Phase 1: Setup & Run ✅
- [x] Backend structure
- [x] Frontend files
- [x] Database models
- [x] API endpoints

### Phase 2: Development 🔄
- [x] Implement CRUD
- [x] Add validation
- [x] Create UI
- [x] Test API

### Phase 3: Production (Optional)
- [ ] Add authentication
- [ ] Setup PostgreSQL
- [ ] Deploy to cloud
- [ ] Add tests

---

## 🐛 Gặp Vấn Đề?

### Troubleshooting
1. **Chạy setup check**: `python setup_check.py`
2. **Đọc QUICKSTART.md**: Phần troubleshooting
3. **Xem console**: Browser console hoặc terminal

### Common Issues
- **CORS Error** → Backend chưa chạy
- **Port in use** → Thay port trong config
- **DB Error** → Xóa .db file và tạo lại

---

## 📊 Project Stats

| Thống Kê | Con Số |
|---------|--------|
| Files | 25+ |
| Code Lines | ~2,500 |
| API Endpoints | 11 |
| Models | 2 |
| Documentation | 5 files |
| Setup Time | ~5 min |

---

## 🎓 Prerequisites

- **Python**: 3.8+
- **Browser**: Modern (Chrome, Firefox, Safari, Edge)
- **Terminal**: Command line knowledge

---

## 📞 Support

Nếu bạn cần trợ giúp:

1. **Kiểm tra tài liệu**
   - README.md - Tổng quan
   - QUICKSTART.md - Bắt đầu nhanh
   - GUIDE.md - Chi tiết

2. **Chạy tests**
   ```bash
   python setup_check.py
   ```

3. **Xem API docs**
   - API_DOCS.md - API reference

4. **Check logs**
   - Terminal backend
   - Browser console

---

## ✅ Checklist Trước Khi Chạy

- [ ] Python 3.8+ installed
- [ ] pip working
- [ ] Read README.md
- [ ] Ran setup_check.py
- [ ] Installed requirements.txt
- [ ] .env file present

---

## 🚀 Let's Get Started!

### Recommended Order:

1. **Read**: [QUICKSTART.md](QUICKSTART.md) (5 min)
2. **Run**: Setup commands (5 min)
3. **Test**: Access application (2 min)
4. **Learn**: Read [GUIDE.md](GUIDE.md) (10 min)
5. **Explore**: Try API endpoints in [API_DOCS.md](API_DOCS.md) (10 min)

---

## 📝 Notes

- Development version (not for production)
- SQLite database (suitable for learning)
- No authentication (add for production)
- Sample data included

---

## 🎉 Ready?

Start with: **[QUICKSTART.md](QUICKSTART.md)** ➜ Run Backend ➜ Open Frontend ➜ Enjoy!

---

**Version**: 1.0  
**Status**: ✅ Complete  
**Created**: January 2024

Happy Coding! 🚀
