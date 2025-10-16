#!/bin/bash

# Device Management Lab - Startup Script (Backend + Frontend)

echo ""
echo "========================================="
echo " Lab Device Management System"
echo "========================================="
echo ""

# Check Python
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    echo "Error: Python is not installed"
    exit 1
fi

# Set Python command
if command -v python3 &> /dev/null; then
    PYTHON="python3"
else
    PYTHON="python"
fi

# Install dependencies
echo "Installing backend dependencies..."
cd backend

if [ ! -d "venv" ]; then
    $PYTHON -m venv venv
fi

source venv/bin/activate
pip install -r requirements.txt > /dev/null 2>&1

# Start backend
echo ""
echo "Starting Flask server on http://localhost:5000..."
$PYTHON run.py &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend
echo ""
echo "Starting Frontend server on http://localhost:8000..."
cd ../frontend
$PYTHON -m http.server 8000 > /dev/null 2>&1 &
FRONTEND_PID=$!

# Wait a bit
sleep 2

# Open browser (macOS and Linux)
echo ""
echo "Opening application in browser..."
if command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:8000  # Linux
elif command -v open &> /dev/null; then
    open http://localhost:8000  # macOS
fi

echo ""
echo "========================================="
echo " ✓ Backend running on http://localhost:5000"
echo " ✓ Frontend running on http://localhost:8000"
echo " ✓ Browser should open automatically"
echo "========================================="
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for signals
trap "kill $BACKEND_PID $FRONTEND_PID; exit 0" SIGINT SIGTERM
wait
