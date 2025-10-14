@echo off
cd /d C:\Users\HP\OneDrive\Desktop\auto-service-platform\backend
echo Dossier courant : %CD%
echo.
echo Démarrage en mode développement...
call npm run start:dev
