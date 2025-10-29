@echo off
cd /d "%~dp0"
echo Starting setup...

:: Run npm install in a persistent cmd window
start cmd /k "npm install && echo. && echo ✅ Setup complete! && pause"
