#!/bin/bash

# Device Management Lab - Startup Script

echo ""
echo "========================================="
echo " Lab Device Management System"
echo "========================================="
echo ""

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "Error: Python3 is not installed"
    exit 1
fi

# Install dependencies if needed
echo "Installing backend dependencies..."
cd backend
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate
pip install -r requirements.txt

# Start backend
echo ""
echo "Starting Flask server on http://localhost:5000..."
echo ""
python3 run.py
