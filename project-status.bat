@echo off
title TalentDash Status

echo =====================================
echo TalentDash Progress
echo =====================================
echo.

if exist "docs\database-schema.md" (
 echo [DONE] Database Architecture
) else (
 echo [TODO] Database Architecture
)

if exist "prisma\schema.prisma" (
 echo [DONE] Prisma Schema
) else (
 echo [TODO] Prisma Schema
)

if exist "prisma\seed.ts" (
 echo [DONE] Seed Script
) else (
 echo [TODO] Seed Script
)

if exist "app\api\ingest-salary" (
 echo [DONE] Ingest API
) else (
 echo [TODO] Ingest API
)

if exist "app\api\salaries" (
 echo [DONE] Salaries API
) else (
 echo [TODO] Salaries API
)

if exist "app\api\companies" (
 echo [DONE] Companies API
) else (
 echo [TODO] Companies API
)

if exist "app\api\compare" (
 echo [DONE] Compare API
) else (
 echo [TODO] Compare API
)

if exist "README.md" (
 echo [DONE] README
) else (
 echo [TODO] README
)

echo.
pause