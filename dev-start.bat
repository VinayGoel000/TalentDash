@echo off
title TalentDash Development Starter

echo ==========================================
echo       TalentDash Development Starter
echo ==========================================
echo.

if not exist "package.json" (
    echo ERROR: package.json not found
    pause
    exit /b
)

echo [1/6] Installing dependencies...
call npm install

echo.
echo [2/6] Generating Prisma Client...
call npx prisma generate

echo.
echo [3/6] Running Database Migrations...
call npx prisma migrate dev --name init

echo.
echo [4/6] Seeding Database...
call npx prisma db seed

echo.
echo [5/6] Running Type Check...
call npx tsc --noEmit

echo.
echo [6/6] Starting Next.js Development Server...
call npm run dev

pause