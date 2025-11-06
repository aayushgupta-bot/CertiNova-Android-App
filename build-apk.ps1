# Azure Certification Quiz - APK Builder (PowerShell)
# ===================================================

Write-Host "Azure Certification Quiz - APK Builder" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

Write-Host "Checking prerequisites..." -ForegroundColor Yellow

# Check if Java is available
try {
    $javaVersion = java -version 2>&1 | Select-String "version" | ForEach-Object { $_.ToString() }
    Write-Host "Java found: $javaVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Java not found. Please install Java 17." -ForegroundColor Red
    Write-Host "Download from: https://jdk.java.net/17/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if Android SDK is available
if (-not $env:ANDROID_HOME) {
    Write-Host "WARNING: ANDROID_HOME not set. Please install Android Studio and set environment variables." -ForegroundColor Yellow
    Write-Host "See ANDROID_SETUP.md for detailed instructions." -ForegroundColor Yellow
}

Write-Host "`nBuilding web application..." -ForegroundColor Yellow
try {
    npm run build
    Write-Host "Web build completed successfully!" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Web build failed" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "`nSyncing with Android..." -ForegroundColor Yellow
try {
    npx cap sync
    Write-Host "Capacitor sync completed successfully!" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Capacitor sync failed" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "`nBuilding Android APK..." -ForegroundColor Yellow
try {
    Set-Location android
    .\gradlew.bat assembleDebug
    Set-Location ..
    
    Write-Host "`nSUCCESS! APK built successfully." -ForegroundColor Green
    Write-Host "Location: android\app\build\outputs\apk\debug\app-debug.apk" -ForegroundColor Cyan
} catch {
    Set-Location ..
    Write-Host "ERROR: Android build failed" -ForegroundColor Red
    Write-Host "Please check ANDROID_SETUP.md for troubleshooting steps" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Read-Host "`nPress Enter to exit"