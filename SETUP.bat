@echo off

@echo This script generate folders for each day of advent calendar.
set /P fileName=Enter file name:
mkdir %fileName%
cd %fileName%

for /l %%x in (1, 1, 25) do (
    mkdir Day_%%x
	cd Day_%%x
	@echo 2> README.md
	@echo 2> script.ts
	@echo 2> puzzle_input.txt
	cd ..
)

pause