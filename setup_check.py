"""
Quick start guide and setup verification
"""

import os
import sys
from pathlib import Path

def check_python_version():
    """Check Python version"""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 8):
        print("❌ Python 3.8+ required")
        return False
    print(f"✅ Python {version.major}.{version.minor}.{version.micro}")
    return True

def check_files():
    """Check if all required files exist"""
    required_files = [
        'backend/run.py',
        'backend/requirements.txt',
        'backend/app/__init__.py',
        'backend/app/models/device.py',
        'backend/app/models/category.py',
        'frontend/index.html',
        'frontend/js/api.js',
        'frontend/js/app.js'
    ]
    
    print("\nChecking files...")
    all_exist = True
    for file in required_files:
        if Path(file).exists():
            print(f"  ✅ {file}")
        else:
            print(f"  ❌ {file}")
            all_exist = False
    
    return all_exist

def main():
    """Main setup check"""
    print("=" * 50)
    print("Lab Device Management - Setup Check")
    print("=" * 50)
    
    if not check_python_version():
        sys.exit(1)
    
    if not check_files():
        print("\n❌ Some files are missing!")
        sys.exit(1)
    
    print("\n" + "=" * 50)
    print("✅ All checks passed!")
    print("=" * 50)
    
    print("\n📋 Quick Start Guide:")
    print("\n1. Backend Setup:")
    print("   cd backend")
    print("   pip install -r requirements.txt")
    print("   python seed.py  # (optional) Load sample data")
    print("   python run.py")
    print("\n2. Frontend Setup:")
    print("   cd frontend")
    print("   # Open index.html in browser or use:")
    print("   python -m http.server 8000")
    print("\n3. API Base URL:")
    print("   http://localhost:5000/api")
    print("\n" + "=" * 50)

if __name__ == '__main__':
    main()
