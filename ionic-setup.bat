@echo off
echo Azure Certification Quiz - Ionic Dashboard Quick Start
echo =====================================================

echo Step 1: Building web application...
call npm run ionic:build
if errorlevel 1 (
    echo ERROR: Build failed
    pause
    exit /b 1
)

echo Step 2: Syncing with Capacitor...
call npx cap sync
if errorlevel 1 (
    echo ERROR: Sync failed
    pause
    exit /b 1
)

echo.
echo ✅ Project ready for Ionic Dashboard!
echo.
echo Next steps:
echo 1. Run: ionic login
echo 2. Run: ionic link
echo 3. Run: ionic capacitor build android --prod
echo.
echo Or visit: https://dashboard.ionicframework.com/
echo.
pause