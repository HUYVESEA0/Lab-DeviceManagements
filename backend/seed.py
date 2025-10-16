"""
Database seed script - populate sample data
"""

from app import create_app, db
from app.models.category import Category
from app.models.device import Device
from datetime import datetime, date

def seed_database():
    """Seed database with sample data"""
    app = create_app()
    
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()
        
        # Create categories
        categories_data = [
            {
                'name': 'Thiết bị đo lường',
                'description': 'Các thiết bị sử dụng để đo lường các đại lượng'
            },
            {
                'name': 'Thiết bị điện tử',
                'description': 'Các linh kiện và thiết bị điện tử'
            },
            {
                'name': 'Thiết bị cơ khí',
                'description': 'Các công cụ và thiết bị cơ khí'
            },
            {
                'name': 'Thiết bị thí nghiệm',
                'description': 'Các thiết bị dùng cho thí nghiệm'
            }
        ]
        
        categories = []
        for cat_data in categories_data:
            category = Category(
                name=cat_data['name'],
                description=cat_data['description']
            )
            categories.append(category)
            db.session.add(category)
        
        db.session.commit()
        
        # Create devices
        devices_data = [
            {
                'name': 'Máy Đo Điện Áp (Vôn Kế)',
                'description': 'Đo điện áp AC/DC',
                'model': 'DT-830B',
                'serial_number': 'DT830B-001',
                'quantity': 5,
                'status': 'available',
                'location': 'Tủ A1',
                'purchase_date': date(2023, 6, 15),
                'category_id': 1
            },
            {
                'name': 'Máy Đo Dòng Điện (Ampe Kế)',
                'description': 'Đo dòng điện AC/DC',
                'model': 'DT-830B',
                'serial_number': 'DT830B-002',
                'quantity': 3,
                'status': 'available',
                'location': 'Tủ A1',
                'purchase_date': date(2023, 6, 15),
                'category_id': 1
            },
            {
                'name': 'Máy Đo Điện Trở (Ôm Kế)',
                'description': 'Đo giá trị điện trở',
                'model': 'DT-830B',
                'serial_number': 'DT830B-003',
                'quantity': 4,
                'status': 'in_use',
                'location': 'Phòng Lab 1',
                'purchase_date': date(2023, 6, 15),
                'category_id': 1
            },
            {
                'name': 'Điện Trở Mỏng Phim (Film Resistor)',
                'description': '10kΩ, 1W',
                'model': 'MFR-12FBF',
                'serial_number': 'RES-10K-001',
                'quantity': 100,
                'status': 'available',
                'location': 'Tủ B2',
                'purchase_date': date(2024, 1, 10),
                'category_id': 2
            },
            {
                'name': 'Tụ Điện Gốm (Ceramic Capacitor)',
                'description': '10µF, 50V',
                'model': 'MLCC-X7R',
                'serial_number': 'CAP-10U-001',
                'quantity': 200,
                'status': 'available',
                'location': 'Tủ B3',
                'purchase_date': date(2024, 1, 10),
                'category_id': 2
            },
            {
                'name': 'Bộ Mỏ Hàn (Soldering Iron)',
                'description': '40W, nhiệt độ điều chỉnh',
                'model': 'HAKKO-FX-888',
                'serial_number': 'SOLDER-001',
                'quantity': 2,
                'status': 'in_use',
                'location': 'Phòng thực hành 2',
                'purchase_date': date(2023, 3, 20),
                'category_id': 3
            },
            {
                'name': 'Kìm Cắt (Wire Cutter)',
                'description': 'Cắt dây, component',
                'model': 'KNIPEX-77',
                'serial_number': 'TOOL-CUTTER-001',
                'quantity': 6,
                'status': 'available',
                'location': 'Tủ C1',
                'purchase_date': date(2023, 5, 12),
                'category_id': 3
            },
            {
                'name': 'Đầu In Dạng Sóng (Waveform Generator)',
                'description': 'Tạo sóng đơn, vuông, tam giác',
                'model': 'XFY-3005',
                'serial_number': 'WGEN-001',
                'quantity': 1,
                'status': 'maintenance',
                'location': 'Phòng Lab 3',
                'purchase_date': date(2022, 11, 8),
                'category_id': 4
            },
            {
                'name': 'Nguồn Điện Cấu Hình Linh Hoạt',
                'description': '0-30V, 0-5A',
                'model': 'KXN-3005',
                'serial_number': 'PSU-001',
                'quantity': 2,
                'status': 'available',
                'location': 'Tủ D1',
                'purchase_date': date(2023, 8, 22),
                'category_id': 4
            },
            {
                'name': 'Bảng Lắp Ráp Mạch (Breadboard)',
                'description': '830 điểm kết nối',
                'model': 'BB-830',
                'serial_number': 'BB-830-001',
                'quantity': 15,
                'status': 'broken',
                'location': 'Tủ D2',
                'purchase_date': date(2023, 2, 14),
                'category_id': 4
            }
        ]
        
        for device_data in devices_data:
            device = Device(**device_data)
            db.session.add(device)
        
        db.session.commit()
        
        print("✅ Database seeded successfully!")
        print(f"   - Created {len(categories)} categories")
        print(f"   - Created {len(devices_data)} devices")

if __name__ == '__main__':
    seed_database()
