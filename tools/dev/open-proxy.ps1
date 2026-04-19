param(
  [string]$Url = "http://webpack.localhost:11944/bundle.proxy.user.js"
)

$message = @(
  "Opening proxy userscript:",
  $Url,
  "",
  "Install or update this script in Tampermonkey or Violentmonkey after the dev server is running."
)

Write-Host ($message -join [Environment]::NewLine)
Start-Process $Url