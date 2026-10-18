bat
@echo off
cd /d "%~dp0"

start "SensiFinder Server" cmd /k "node backend/api/server.js"
timeout /t 3 /nobreak >nul
start "" http://localhost:3000
