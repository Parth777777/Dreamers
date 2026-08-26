$ErrorActionPreference = "Stop"
$session = "dreamers-demo"
$out = Join-Path $PSScriptRoot "..\demo-videos\dreamers-site-demo.webm"
$url = if ($env:DEMO_URL) { $env:DEMO_URL } else { "http://127.0.0.1:3000" }

New-Item -ItemType Directory -Force -Path (Split-Path $out) | Out-Null
agent-browser close --all 2>$null | Out-Null

Write-Host "Recording $url -> $out"
agent-browser --session $session open $url
agent-browser --session $session record start $out
agent-browser --session $session wait 5000

foreach ($scroll in 900, 1000, 1100, 1200, 1300, 1400, 1400, 1400) {
  agent-browser --session $session scroll down $scroll
  agent-browser --session $session wait 1200
}

agent-browser --session $session open "$url/#videos"
agent-browser --session $session wait --load networkidle
agent-browser --session $session wait 2500
agent-browser --session $session record stop
agent-browser --session $session close

Write-Host "Done: $out"
