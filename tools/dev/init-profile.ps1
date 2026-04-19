# Init Chrome Profile for Tampermonkey E2E testing
# Steps:
# 1. Create dedicated Chrome user data directory
# 2. Launch Chrome and open Tampermonkey Web Store page
# 3. Open dev proxy script install page
# First run requires manual installation in the browser.

param(
    [string]$ProfileName = "TampermonkeyE2E"
)

$ErrorActionPreference = "Stop"

$profileDir = Join-Path $env:LOCALAPPDATA "Google\Chrome\User Data\$ProfileName"

if (-not (Test-Path $profileDir)) {
    New-Item -ItemType Directory -Path $profileDir -Force | Out-Null
    Write-Host "[OK] Created Chrome Profile: $profileDir" -ForegroundColor Green
} else {
    Write-Host "[OK] Chrome Profile exists: $profileDir" -ForegroundColor Yellow
}

# Find Chrome executable
$chromePaths = @(
    "${env:ProgramFiles}\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
    "${env:LOCALAPPDATA}\Google\Chrome\Application\chrome.exe"
)

$chromeExe = $null
foreach ($p in $chromePaths) {
    if (Test-Path $p) {
        $chromeExe = $p
        break
    }
}

if (-not $chromeExe) {
    Write-Host "[ERROR] Chrome not found! Please install Google Chrome." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Tampermonkey E2E - Profile Init" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Opening Chrome with Profile: $ProfileName" -ForegroundColor White
Write-Host ""
Write-Host "Please complete these steps in the browser:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  Step 1: Install Tampermonkey extension" -ForegroundColor White
Write-Host "          Click Add to Chrome on the Web Store page" -ForegroundColor Gray
Write-Host ""
Write-Host "  Step 2: Install Dev Proxy script" -ForegroundColor White
Write-Host "          Make sure dev server is running (yarn dev)" -ForegroundColor Gray
Write-Host "          Click Install in Tampermonkey on the proxy page" -ForegroundColor Gray
Write-Host ""
Write-Host "  Step 3: Close Chrome when done" -ForegroundColor White
Write-Host ""
Write-Host "NOTE: This is a one-time setup." -ForegroundColor Cyan
Write-Host "After this, use 'yarn test:e2e' to run tests." -ForegroundColor Cyan
Write-Host ""

# Launch Chrome
$chromeArgs = @(
    "--user-data-dir=`"$profileDir`"",
    "--no-first-run",
    "--no-default-browser-check"
)

# URLs
$tampermonkeyUrl = "https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo"
$proxyScriptUrl = "http://webpack.localhost:11944/bundle.proxy.user.js"

Start-Process $chromeExe -ArgumentList ($chromeArgs -join " ") -PassThru | Out-Null

# Wait for Chrome to start
Start-Sleep -Seconds 3

# Open Tampermonkey install page
Start-Process $chromeExe -ArgumentList "--user-data-dir=`"$profileDir`" $tampermonkeyUrl"
Start-Sleep -Seconds 2
Start-Process $chromeExe -ArgumentList "--user-data-dir=`"$profileDir`" $proxyScriptUrl"

Write-Host ""
Write-Host "[OK] Chrome launched. Complete the manual setup in the browser." -ForegroundColor Green
Write-Host "After setup, close Chrome and run: yarn test:e2e" -ForegroundColor Green
