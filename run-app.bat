@echo off
cd /d "%~dp0"
echo Starting app in background...
start "" cmd /k "npm run dev"
