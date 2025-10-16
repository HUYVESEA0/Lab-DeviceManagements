@echo off
REM Device Management Lab - Startup Script (Backend + Frontend)

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
pip install -r requirements.txt >nul 2>&1

REM Start backend in a new window
echo.
echo Starting Flask server on http://localhost:5000...
start cmd /k "cd backend && python run.py"

REM Wait for backend to start
timeout /t 3 /nobreak

REM Start frontend HTTP server in a new window
echo.
echo Starting Frontend server on http://localhost:8000...
cd ..
start cmd /k "cd frontend && python -m http.server 8000"

REM Wait a bit
timeout /t 2 /nobreak

REM Open browser
echo.
echo Opening application in browser...
timeout /t 2 /nobreak
start http://localhost:8000

echo.
echo =========================================
echo  ✓ Backend running on http://localhost:5000
echo  ✓ Frontend running on http://localhost:8000
echo  ✓ Browser should open automatically
echo =========================================
echo.
echo Close any command window to stop the servers.
echo.

pause
