#!/bin/bash

# Device Management Lab - Complete Startup Script (Backend + Frontend)
# For macOS and Linux

echo ""
echo "========================================="
echo " Lab Device Management System"
echo " Backend + Frontend Launcher"
echo "========================================="
echo ""

# Check Python
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    echo "Error: Python is not installed"
    echo "Please install Python 3.8+ from python.org"
    exit 1
fi

# Set Python command
if command -v python3 &> /dev/null; then
    PYTHON="python3"
else
    PYTHON="python"
fi

# Check if we're in the right directory
if [ ! -f "backend/run.py" ]; then
    echo "Error: This script must be run from the Lab-DeviceManagements root directory"
    exit 1
fi

# Install dependencies
echo "[1/4] Checking and installing backend dependencies..."
cd backend

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    $PYTHON -m venv venv
fi

source venv/bin/activate
pip install -q -r requirements.txt

if [ $? -ne 0 ]; then
    echo "Error: Failed to install dependencies"
    exit 1
fi

cd ..

echo "[2/4] Dependencies installed successfully"
echo ""

# Start backend in background
echo "[3/4] Starting Flask backend server..."
cd backend
$PYTHON run.py > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Start frontend in background
echo "[4/4] Starting Frontend HTTP server..."
cd frontend
$PYTHON -m http.server 8000 > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Wait a bit
sleep 2

# Open browser
echo ""
echo "Opening application in default browser..."
sleep 1

if command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:8000  # Linux
elif command -v open &> /dev/null; then
    open http://localhost:8000  # macOS
fi

echo ""
echo "========================================="
echo " SUCCESS! Application is running"
echo "========================================="
echo ""
echo "  Backend:  http://localhost:5000/api"
echo "  Frontend: http://localhost:8000"
echo ""
echo "  Logs:"
echo "    Backend:  /tmp/backend.log"
echo "    Frontend: /tmp/frontend.log"
echo ""
echo "========================================="
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Cleanup on exit
cleanup() {
    echo ""
    echo "Shutting down servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo "Done."
    exit 0
}

trap cleanup SIGINT SIGTERM
wait
