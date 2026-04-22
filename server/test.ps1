$key = Get-Content -Path ".env" | Select-String "OPENAI_API_KEY=" | ForEach-Object { $_.Line.Split("=")[1].Trim('"') }
$url = "https://generativelanguage.googleapis.com/v1beta/models?key=$key"
$result = Invoke-RestMethod -Uri $url -Method Get
$result.models | Select-Object -ExpandProperty name
