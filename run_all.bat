@echo off
REM Device Management Lab - Complete Startup Script (Backend + Frontend)
REM For Windows

echo.
echo =========================================
echo  Lab Device Management System
echo  Backend + Frontend Launcher
echo =========================================
echo.

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    echo Please install Python 3.8+ from python.org
    pause
    exit /b 1
)

REM Check if we're in the right directory
if not exist "backend\run.py" (
    echo Error: This script must be run from the Lab-DeviceManagements root directory
    pause
    exit /b 1
)

REM Install dependencies if needed
echo [1/4] Checking and installing backend dependencies...
cd backend
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)
call venv\Scripts\activate.bat
pip install -q -r requirements.txt
if errorlevel 1 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)
cd ..

echo [2/4] Dependencies installed successfully
echo.

REM Start backend in a new window
echo [3/4] Starting Flask backend server...
start "Lab Device Management - Backend (Port 5000)" cmd /k "cd backend && python run.py"

REM Wait for backend to start
timeout /t 3 /nobreak

REM Start frontend HTTP server in a new window
echo [4/4] Starting Frontend HTTP server...
start "Lab Device Management - Frontend (Port 8000)" cmd /k "cd frontend && python -m http.server 8000"

REM Wait a bit
timeout /t 2 /nobreak

REM Open browser
echo.
echo Opening application in default browser...
timeout /t 1 /nobreak
start http://localhost:8000

echo.
echo =========================================
echo  SUCCESS! Application is running
echo =========================================
echo.
echo  Backend:  http://localhost:5000/api
echo  Frontend: http://localhost:8000
echo.
echo  Press ENTER to exit this window
echo  (The backend and frontend will continue running)
echo.
echo =========================================
echo.

pause
