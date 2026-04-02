#!/bin/bash
# Cortexa Unified Startup Script
# Starts both backend and frontend servers

echo "================================"
echo "   CORTEXA AI STUDY PLATFORM"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Start Backend
echo -e "${BLUE}Starting Cortexa Backend (AI Engine)...${NC}"
cd ai-study-assistant
python main.py &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend started (PID: $BACKEND_PID)${NC}"
echo "  URL: http://localhost:8000"
echo ""

# Wait a moment for backend to start
sleep 2

# Start Frontend
echo -e "${BLUE}Starting Cortexa Frontend (React UI)...${NC}"
cd ../ui_app/aca-mind-ui
npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend started (PID: $FRONTEND_PID)${NC}"
echo ""

echo "================================"
echo -e "${GREEN}Cortexa is now running!${NC}"
echo "================================"
echo ""
echo "Frontend:  http://localhost:5174"
echo "Backend:   http://localhost:8000"
echo "API Docs:  http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for both processes
wait
