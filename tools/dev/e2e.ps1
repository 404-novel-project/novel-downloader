<#
.SYNOPSIS
    一键运行 Tampermonkey E2E 自动化验证。
.DESCRIPTION
    此脚本会依次：
    1. 检查 Profile 是否已初始化
    2. 启动 dev server（如果尚未运行）
    3. 运行 Playwright E2E 测试
    4. 自动打开截图目录
.PARAMETER SkipDevServer
    跳过 dev server 启动（假设已经在运行）
.PARAMETER TestCase
    只运行指定的测试用例名称
#>
param(
    [switch]$SkipDevServer,
    [string]$TestCase
)

$ErrorActionPreference = "Stop"
$projectRoot = Resolve-Path (Join-Path $PSScriptRoot ".." "..")

Write-Host ""
Write-Host "╔══════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  Tampermonkey E2E 一键验证                        ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Step 1: 检查 Profile
$profileDir = Join-Path $env:LOCALAPPDATA "Google\Chrome\User Data\TampermonkeyE2E"
if (-not (Test-Path $profileDir)) {
    Write-Host "❌ Chrome Profile 未初始化！" -ForegroundColor Red
    Write-Host ""
    Write-Host "请先运行初始化（仅需一次）：" -ForegroundColor Yellow
    Write-Host "  powershell tools\dev\init-profile.ps1" -ForegroundColor White
    Write-Host ""
    exit 1
}
Write-Host "✅ Chrome Profile 已就绪" -ForegroundColor Green

# Step 2: 启动 dev server（后台）
if (-not $SkipDevServer) {
    Write-Host ""
    Write-Host "检查 dev server ..." -ForegroundColor Cyan
    
    try {
        $null = Invoke-WebRequest -Uri "http://webpack.localhost:11944/bundle.proxy.user.js" -Method HEAD -TimeoutSec 3 -UseBasicParsing
        Write-Host "✅ Dev server 已在运行" -ForegroundColor Green
    } catch {
        Write-Host "启动 dev server ..." -ForegroundColor Yellow
        Start-Process -FilePath "yarn" -ArgumentList "dev" -WorkingDirectory $projectRoot -WindowStyle Hidden
        
        # 等待 dev server 就绪（最多 30 秒）
        $ready = $false
        for ($i = 0; $i -lt 15; $i++) {
            Start-Sleep -Seconds 2
            try {
                $null = Invoke-WebRequest -Uri "http://webpack.localhost:11944/bundle.proxy.user.js" -Method HEAD -TimeoutSec 2 -UseBasicParsing
                $ready = $true
                break
            } catch {
                Write-Host "  等待中... ($($i * 2)s)" -ForegroundColor DarkGray
            }
        }
        
        if ($ready) {
            Write-Host "✅ Dev server 已启动" -ForegroundColor Green
        } else {
            Write-Host "❌ Dev server 启动超时" -ForegroundColor Red
            exit 1
        }
    }
}

# Step 3: 运行 E2E 测试
Write-Host ""
Write-Host "运行 E2E 测试 ..." -ForegroundColor Cyan
Write-Host ""

$tsxArgs = @("tsx", "test/e2e-validate.ts")
if ($TestCase) {
    # 可扩展：传入特定测试用例
}

Push-Location $projectRoot
try {
    & yarn $tsxArgs
    $exitCode = $LASTEXITCODE
} finally {
    Pop-Location
}

# Step 4: 打开截图目录
$screenshotDir = Join-Path $projectRoot "test\screenshots"
if (Test-Path $screenshotDir) {
    Write-Host ""
    Write-Host "📸 打开截图目录 ..." -ForegroundColor Cyan
    Start-Process "explorer.exe" $screenshotDir
}

Write-Host ""
if ($exitCode -eq 0) {
    Write-Host "✅ 所有测试通过！" -ForegroundColor Green
} else {
    Write-Host "❌ 部分测试失败，请查看截图。" -ForegroundColor Red
}

exit $exitCode
