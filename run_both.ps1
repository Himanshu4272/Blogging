# run_both.ps1
# This script starts the Django backend (using python manage.py runserver) and then (in a new window) starts the frontend (using npm run dev) from the frontend directory.

# Activate the virtual environment (adjust the path if your venv is elsewhere)
Write-Host "Activating virtual environment (venv) ..."
$ActivateScript = Join-Path $PSScriptRoot "venv\Scripts\Activate.ps1"
if (Test-Path $ActivateScript) {
    & $ActivateScript
} else {
    Write-Error "Activate script not found at $ActivateScript. Please ensure your virtual environment is set up."
    exit 1
}

# Start the Django backend (in a new PowerShell window) – using the activated venv
Write-Host "Starting Django backend (python manage.py runserver) in a new window (with venv activated) ..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "& { cd $PSScriptRoot; & $ActivateScript; python manage.py runserver }"

# Wait a moment (for example, 2 seconds) so that the backend is up before starting the frontend.
Start-Sleep -Seconds 2

# Start the frontend (in a new window) by changing into the frontend directory and running npm run dev.
Write-Host "Starting frontend (npm run dev) in a new window ..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd $PSScriptRoot\frontend; npm run dev" 