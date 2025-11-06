#!/bin/bash
set -e

echo "========================================"
echo "Dr. Marie Martin Video Showcase Setup"
echo "========================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "[ERROR] Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

echo "✓ Python 3 detected: $(python3 --version)"
echo ""

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "[ERROR] pip is not installed. Please install pip."
    exit 1
fi

echo "Step 1: Installing Python dependencies..."
pip3 install -r requirements.txt
echo ""

echo "Step 2: Creating output directory..."
mkdir -p output
echo "✓ Output directory created"
echo ""

echo "Step 3: Processing videos..."
if [ -z "$SOURCE_VIDEO" ]; then
    echo "[INFO] SOURCE_VIDEO environment variable not set."
    echo "Please set it before running video processing:"
    echo "  export SOURCE_VIDEO='/path/to/Dr. Martin Video.mp4'"
    echo "  python3 process_videos.py"
else
    python3 process_videos.py
fi
echo ""

echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Set SOURCE_VIDEO environment variable (if not already set)"
echo "2. Run: python3 process_videos.py"
echo "3. Open index.html in your browser to view the website"
echo ""
