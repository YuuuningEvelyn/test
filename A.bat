@echo off
title 项目启动
cls

:: 强制64位运行
if exist "%SystemRoot%\Sysnative\cmd.exe" (
    "%SystemRoot%\Sysnative\cmd.exe" /c "%~f0"
    exit /b
)

:: 编码
chcp 936 >nul

:: 进入脚本目录
cd /d "%~dp0"

:: ==================== 路径配置 ====================
set "NODE_DIR=%~dp0NODE\node-v25.9.0-win-x64"
set "NODE=%NODE_DIR%\node.exe"
set "NPM=%NODE_DIR%\node_modules\npm\bin\npm-cli.js"
:: ==================================================

:: 检查node
if not exist "%NODE%" (
    echo 错误：找不到node.exe
    pause
    exit /b
)

:: 检查npm
if not exist "%NPM%" (
    echo 错误：找不到npm
    pause
    exit /b
)

:: 检查项目
if not exist "package.json" (
    echo 错误：当前目录没有package.json
    pause
    exit /b
)

echo 已加载本地Node.js
echo.

:: 版本查看
"%NODE%" -v
echo.

:: 安装依赖（核心修复：不调用npm.cmd，直接用node运行npm）
echo 正在安装依赖...
"%NODE%" "%NPM%" install --registry=https://registry.npmmirror.com --force

:: 启动项目（核心修复）
echo 正在启动项目...
"%NODE%" "%NPM%" run dev

echo.
pause