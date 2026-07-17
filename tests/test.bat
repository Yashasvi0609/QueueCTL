@echo off

echo ===============================
echo QueueCTL Basic Test
echo ===============================

echo.
echo [1] Enqueue a successful job...
node ..\src\cli\index.js enqueue "{\"command\":\"echo QueueCTL Test Success\"}"

echo.
echo [2] Enqueue a failing job...
node ..\src\cli\index.js enqueue "{\"command\":\"invalidcommand\"}"

echo.
echo [3] List all jobs...
node ..\src\cli\index.js list

echo.
echo [4] Queue Status...
node ..\src\cli\index.js status

echo.
echo Tests completed.
pause