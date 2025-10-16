@echo off
REM Device Management Lab - Startup Script

echo.
echo =========================================
echo  Lab Device Management System
echo =========================================
echo.

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    pause
    exit /b 1
)

REM Install dependencies if needed
echo Installing backend dependencies...
cd backend
if not exist "venv" (
    python -m venv venv
)
call venv\Scripts\activate.bat
pip install -r requirements.txt

REM Start backend
echo.
echo Starting Flask server on http://localhost:5000...
echo.
python run.py

pause
