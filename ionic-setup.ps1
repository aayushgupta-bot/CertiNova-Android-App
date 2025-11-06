# Azure Certification Quiz - Ionic Dashboard Quick Start
# ====================================================

Write-Host "Azure Certification Quiz - Ionic Dashboard Quick Start" -ForegroundColor Green
Write-Host "====================================================" -ForegroundColor Green

Write-Host "`nStep 1: Building web application..." -ForegroundColor Yellow
try {
    npm run ionic:build
    Write-Host "✅ Build completed successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ ERROR: Build failed" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "`nStep 2: Syncing with Capacitor..." -ForegroundColor Yellow
try {
    npx cap sync
    Write-Host "✅ Sync completed successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ ERROR: Sync failed" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "`n✅ Project ready for Ionic Dashboard!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Run: ionic login" -ForegroundColor White
Write-Host "2. Run: ionic link" -ForegroundColor White
Write-Host "3. Run: ionic capacitor build android --prod" -ForegroundColor White
Write-Host "`nOr visit: https://dashboard.ionicframework.com/" -ForegroundColor Cyan
Write-Host "`nSee IONIC_DASHBOARD_GUIDE.md for detailed instructions!" -ForegroundColor Yellow

Read-Host "`nPress Enter to exit"