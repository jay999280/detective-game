@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ===================================
echo   推理游戏 - 正在启动...
echo ===================================
echo.

REM Kill any existing server on port 3001
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3001.*LISTENING"') do (
    taskkill /F /PID %%a 2>nul
)

REM Build frontend if needed
if not exist "client\dist\index.html" (
    echo [1/3] 首次启动，构建前端... (30秒)
    cd client
    call npx vite build
    cd ..
)

echo [1/3] 启动服务器...
start "GameServer" cmd /c "cd /d %~dp0server && npx tsx src/index.ts"
timeout /t 3 >nul

echo [2/3] 生成公网链接...
start "GameTunnel" cmd /k "cd /d %~dp0 && npx localtunnel --port 3001"

echo [3/3] 打开浏览器...
timeout /t 5 >nul
npx localtunnel --port 3001 >nul 2>&1
start http://localhost:3001

echo.
echo ==========================================
echo   游戏已启动！
echo.
echo   你自己用:  http://localhost:3001
echo   别人用:    看弹出的命令行窗口里的链接
echo              (格式: https://xxxx.loca.lt)
echo.
echo   关掉命令行窗口 = 停止服务
echo ==========================================
echo.
pause
