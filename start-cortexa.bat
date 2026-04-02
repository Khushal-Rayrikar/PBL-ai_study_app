@echo off
REM Cortexa Unified Startup Script (Windows)
REM Starts both backend and frontend servers

echo.
echo ================================
echo    CORTEXA AI STUDY PLATFORM
echo ================================
echo.

REM Start Backend
echo Starting Cortexa Backend (AI Engine)...
start "Cortexa Backend" cmd /k "cd ai-study-assistant && python main.py"
echo.
echo Backend: http://localhost:8000
echo.

REM Wait a moment for backend to start
timeout /t 3 /nobreak

REM Start Frontend
echo Starting Cortexa Frontend (React UI)...
start "Cortexa Frontend" cmd /k "cd ui_app\aca-mind-ui && npm run dev"
echo.

echo ================================
echo Cortexa is now running!
echo ================================
echo.
echo Frontend:  http://localhost:5174
echo Backend:   http://localhost:8000
echo API Docs:  http://localhost:8000/docs
echo.
echo Close the terminal windows to stop services
echo.
pause
