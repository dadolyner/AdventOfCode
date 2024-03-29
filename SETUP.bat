@echo off
set /P fileName=Enter file name:
mkdir %fileName%
cd %fileName%

for /l %%x in (1, 1, 25) do (
    mkdir Day_%%x
    cd Day_%%x
    
    @echo 2> puzzle_input.txt
	@echo 2> README.md
    
	@echo 2> script.ts
    @echo import { usePuzzleInput } from "../utils"; >> script.ts
    @echo // @ts-ignore >> script.ts
    @echo const PuzzleInput = usePuzzleInput(__dirname); >> script.ts
    cd ..
)

pause