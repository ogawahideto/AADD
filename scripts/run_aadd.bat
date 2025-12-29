@echo off
REM AADD Daily Run - Batch Script for Task Scheduler
REM This script activates the virtual environment and runs AADD

echo ============================================================
echo AADD Daily Run Starting at %date% %time%
echo ============================================================

REM Get the directory where this batch file is located
set SCRIPT_DIR=%~dp0
REM Change to AADD directory (parent of scripts folder)
cd /d "%SCRIPT_DIR%.."

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Set PYTHONPATH (relative to project root)
set PYTHONPATH=%PYTHONPATH%;%CD%\src

REM Run AADD
echo Running AADD...
python src\main.py

REM Store exit code
set EXIT_CODE=%ERRORLEVEL%

REM Deactivate virtual environment
call venv\Scripts\deactivate.bat

echo ============================================================
echo AADD Daily Run Completed at %date% %time%
echo Exit Code: %EXIT_CODE%
echo ============================================================

REM Exit with the same code as the Python script
exit /b %EXIT_CODE%
