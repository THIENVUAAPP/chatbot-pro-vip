#!/bin/bash

echo "Starting ChatBot Pro SaaS System..."

# Start Backend
echo "Starting Backend (FastAPI)..."
cd backend
source venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
cd ..

# Start Frontend
echo "Starting Frontend (Next.js)..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo "====================================="
echo "🚀 SaaS System is running!"
echo "Backend API: http://localhost:8000"
echo "Frontend (Landing Page): http://localhost:3000"
echo "====================================="
echo "Press Ctrl+C to stop both servers."

# Wait for user interrupt
trap "kill $BACKEND_PID $FRONTEND_PID; exit" SIGINT SIGTERM
wait
