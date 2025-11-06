@echo off
echo Azure Certification Quiz - APK Builder
echo =====================================

echo Checking prerequisites...

:: Check if Java is available
java -version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Java not found. Please install Java 17.
    echo Download from: https://jdk.java.net/17/
    pause
    exit /b 1
)

:: Check Java version
for /f "tokens=3" %%g in ('java -version 2^>^&1 ^| findstr /i "version"') do (
    set JAVA_VERSION=%%g
)
echo Java version: %JAVA_VERSION%

:: Check if Android SDK is available
if not defined ANDROID_HOME (
    echo WARNING: ANDROID_HOME not set. Please install Android Studio and set environment variables.
    echo See ANDROID_SETUP.md for detailed instructions.
)

echo.
echo Building web application...
call npm run build
if errorlevel 1 (
    echo ERROR: Web build failed
    pause
    exit /b 1
)

echo.
echo Syncing with Android...
call npx cap sync
if errorlevel 1 (
    echo ERROR: Capacitor sync failed
    pause
    exit /b 1
)

echo.
echo Building Android APK...
cd android
call gradlew.bat assembleDebug
if errorlevel 1 (
    echo ERROR: Android build failed
    echo Please check ANDROID_SETUP.md for troubleshooting steps
    cd ..
    pause
    exit /b 1
)

cd ..
echo.
echo SUCCESS! APK built successfully.
echo Location: android\app\build\outputs\apk\debug\app-debug.apk
echo.
pause