# PowerShell Script to Setup AADD Task Scheduler
# Run this script as Administrator

Write-Host "================================" -ForegroundColor Cyan
Write-Host "AADD Task Scheduler Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Get the directory where this script is located
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
# Get project root (parent of scripts folder)
$projectRoot = Split-Path -Parent $scriptDir

# Task configuration
$taskName = "AADD-DailyRun"
$taskDescription = "Automated Anniversary-Driven Development - Daily execution"
$batchFile = Join-Path $scriptDir "run_aadd.bat"
$workingDir = $projectRoot

# Execution time (9:00 AM every day)
$triggerTime = "09:00"

Write-Host "Task Name: $taskName" -ForegroundColor Yellow
Write-Host "Batch File: $batchFile" -ForegroundColor Yellow
Write-Host "Execution Time: $triggerTime daily" -ForegroundColor Yellow
Write-Host ""

# Check if batch file exists
if (-not (Test-Path $batchFile)) {
    Write-Host "ERROR: Batch file not found at $batchFile" -ForegroundColor Red
    exit 1
}

# Remove existing task if it exists
$existingTask = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
if ($existingTask) {
    Write-Host "Removing existing task..." -ForegroundColor Yellow
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
}

# Create action (run batch file)
$action = New-ScheduledTaskAction `
    -Execute "cmd.exe" `
    -Argument "/c `"$batchFile`"" `
    -WorkingDirectory $workingDir

# Create trigger (daily at 9:00 AM)
$trigger = New-ScheduledTaskTrigger -Daily -At $triggerTime

# Create settings
$settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -RunOnlyIfNetworkAvailable `
    -ExecutionTimeLimit (New-TimeSpan -Hours 1)

# Register the task
Write-Host "Registering scheduled task..." -ForegroundColor Green
Register-ScheduledTask `
    -TaskName $taskName `
    -Description $taskDescription `
    -Action $action `
    -Trigger $trigger `
    -Settings $settings `
    -User $env:USERNAME `
    -RunLevel Highest

Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "Task Scheduler Setup Complete!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "The task '$taskName' has been created and will run daily at $triggerTime" -ForegroundColor Cyan
Write-Host ""
Write-Host "To view or modify the task:" -ForegroundColor Yellow
Write-Host "  1. Open Task Scheduler (taskschd.msc)" -ForegroundColor Yellow
Write-Host "  2. Look for '$taskName' in Task Scheduler Library" -ForegroundColor Yellow
Write-Host ""
Write-Host "To test the task manually:" -ForegroundColor Yellow
Write-Host "  Start-ScheduledTask -TaskName '$taskName'" -ForegroundColor Yellow
Write-Host ""
