@echo off
REM ==============================================================================
REM Script d'installation du module Windows 11 IA pour Antigravity IDE (Windows)
REM ==============================================================================

set SCRIPT_DIR=%~dp0
set TARGET_DIR=%USERPROFILE%\.antigravity\extensions\antigravity-phiso-win11

echo ============================================================
echo  Installation du Module Windows 11 IA dans Antigravity IDE
echo ============================================================

if not exist "%USERPROFILE%\.antigravity\extensions" (
    mkdir "%USERPROFILE%\.antigravity\extensions"
)

if exist "%TARGET_DIR%" (
    echo [1/2] Nettoyage de l'ancienne version...
    rmdir /s /q "%TARGET_DIR%"
)

echo [2/2] Copie du plugin vers %TARGET_DIR%...
xcopy /E /I /Y "%SCRIPT_DIR%*" "%TARGET_DIR%\"

echo.
echo ============================================================
echo  Installation terminee avec succes !
echo.
echo  1. Ouvrez Antigravity IDE.
echo  2. Utilisez le raccourci Ctrl+Alt+W pour basculer la vue.
echo  3. Retrouvez l'icone Windows 11 dans la barre d'activite.
echo ============================================================
pause
