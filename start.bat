@echo off
title TalentDash Project Checker

echo =====================================
echo        TalentDash Project Check
echo =====================================
echo.

echo Checking required files...
echo.

set MISSING=0

if not exist "memory.md" (
    echo [MISSING] memory.md
    set MISSING=1
)

if not exist "docs\design-system.md" (
    echo [MISSING] docs\design-system.md
    set MISSING=1
)

if not exist "docs\product-roadmap.md" (
    echo [MISSING] docs\product-roadmap.md
    set MISSING=1
)

if not exist "docs\tech-stack.md" (
    echo [MISSING] docs\tech-stack.md
    set MISSING=1
)

if not exist "docs\rendering-strategy.md" (
    echo [MISSING] docs\rendering-strategy.md
    set MISSING=1
)

if not exist "docs\data-contract.md" (
    echo [MISSING] docs\data-contract.md
    set MISSING=1
)

if not exist "docs\data-pipeline.md" (
    echo [MISSING] docs\data-pipeline.md
    set MISSING=1
)

if not exist "docs\trial-requirements.md" (
    echo [MISSING] docs\trial-requirements.md
    set MISSING=1
)

if not exist "docs\database-schema.md" (
    echo [MISSING] docs\database-schema.md
    set MISSING=1
)

if not exist "prisma\schema.prisma" (
    echo [MISSING] prisma\schema.prisma
    set MISSING=1
)

if not exist "prisma\seed.ts" (
    echo [MISSING] prisma\seed.ts
    set MISSING=1
)

echo.

if %MISSING%==0 (
    echo [SUCCESS] All required planning files exist.
) else (
    echo [WARNING] Some files are missing.
)

echo.
echo =====================================
echo Current Structure
echo =====================================
tree /f

echo.
pause