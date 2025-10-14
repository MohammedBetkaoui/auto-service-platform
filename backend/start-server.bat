@echo off
cd /d C:\Users\HP\OneDrive\Desktop\auto-service-platform\backend
echo Dossier courant : %CD%
echo.
echo Compilation de l'application...
call npx nest build
echo.
echo Démarrage de l'application...
call npm run start:prod
