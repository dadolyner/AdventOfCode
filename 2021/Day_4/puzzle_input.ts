const PuzzleInput = {
    numbers: [93, 49, 16, 88, 4, 92, 23, 38, 44, 98, 97, 8, 5, 69, 41, 70, 19, 11, 29, 40, 90, 43, 79, 96, 68, 10, 31, 35, 34, 32, 0, 67, 83, 33, 2, 76, 24, 87, 99, 77, 82, 66, 12, 15, 28, 59, 64, 95, 91, 71, 62, 22, 53, 46, 39, 81, 75, 86, 74, 56, 50, 18, 17, 73, 13, 54, 60, 48, 21, 51, 52, 55, 85, 80, 30, 36, 47, 3, 26, 57, 84, 25, 63, 27, 37, 94, 7, 45, 58, 9, 78, 65, 72, 6, 14, 61, 20, 1, 42, 89],
    boards: [
        `83 11 47 61 45 30 74 73 14 66 53 52 10 57 15 64 50 54 28 87 26 85 63 25 86`,
        `72 4 62 30 49 43 93 39 63 25 18 70 44 77 38 84 8 85 5 26 54 50 40 75 2`,
        `70 78 55 26 35 75 44 80 15 34 67 47 53 10 56 73 46 27 38 13 64 92 39 87 23`,
        `24 66 11 44 51 32 37 83 69 85 46 59 14 99 76 71 28 94 35 98 16 40 74 80 6`,
        `1 55 42 59 70 87 81 68 83 56 12 21 20 49 84 89 92 94 2 76 5 17 77 3 32`,
        `66 98 10 53 78 80 92 26 38 29 46 34 22 51 8 43 89 87 64 17 63 86 84 62 15`,
        `75 65 96 19 87 12 51 97 68 8 42 90 61 10 71 69 48 7 15 26 43 89 21 16 35`,
        `64 92 83 2 48 11 34 98 75 96 21 6 54 78 68 42 19 16 41 8 24 58 45 81 49`,
        `59 37 46 1 30 51 6 10 44 82 85 3 27 83 96 48 81 56 34 55 35 99 67 12 78`,
        `14 49 41 82 78 8 70 29 72 32 61 16 19 68 38 93 46 48 42 31 45 36 84 54 11`,
        `96 14 1 71 91 3 89 59 27 2 34 37 5 31 0 22 44 98 43 32 6 66 95 40 46`,
        `75 57 76 50 84 32 59 35 12 86 81 77 42 13 21 91 3 9 44 96 4 52 23 18 37`,
        `16 62 40 8 82 43 70 29 63 9 41 73 77 13 59 44 0 49 53 76 84 55 36 56 48`,
        `81 62 35 65 43 6 84 67 44 48 31 56 73 69 33 66 92 40 77 55 4 70 97 88 13`,
        `63 5 12 66 77 68 74 15 84 16 1 45 72 54 42 58 33 35 65 21 73 60 67 10 95`,
        `0 25 16 42 45 27 98 87 29 3 62 6 88 19 95 84 33 53 89 37 46 38 97 96 77`,
        `98 62 8 73 20 81 83 51 55 21 4 13 70 60 1 32 82 12 22 61 79 40 92 76 36`,
        `91 52 17 13 76 25 79 88 90 87 41 58 89 30 66 56 49 69 35 61 44 57 81 34 43`,
        `69 88 87 72 84 36 55 13 11 27 47 40 34 99 38 23 18 96 57 28 41 67 26 6 54`,
        `39 69 49 40 86 6 75 90 31 21 82 15 48 37 88 55 23 4 7 10 68 81 87 56 73`,
        `41 65 82 20 31 42 22 88 70 75 73 76 54 15 83 67 99 46 28 72 9 51 57 96 38`,
        `3 1 15 13 79 7 94 77 86 30 54 39 9 5 43 66 34 92 87 88 59 93 32 48 51`,
        `98 21 19 76 97 93 83 5 24 99 14 80 85 7 92 8 53 1 78 72 45 20 2 13 6`,
        `51 28 54 62 42 97 70 77 23 81 15 67 33 55 0 35 78 14 61 8 26 13 99 56 24`,
        `71 99 2 72 21 22 54 30 38 41 92 47 56 70 34 28 90 0 67 78 63 14 84 97 61`,
        `86 81 85 21 65 59 47 56 28 32 89 54 44 71 1 80 55 76 12 33 13 11 31 92 88`,
        `54 41 8 46 83 35 2 23 15 52 31 91 92 61 19 25 17 98 53 22 72 78 81 84 27`,
        `61 72 95 50 49 19 37 85 64 71 78 18 59 54 67 75 68 27 90 1 8 62 3 32 83`,
        `0 20 88 30 52 87 13 73 3 79 37 22 10 70 67 61 48 81 40 54 50 68 93 8 34`,
        `88 39 9 36 15 14 79 1 58 83 4 73 42 55 37 0 53 77 28 8 18 92 21 25 62`,
        `65 36 59 80 97 6 60 3 95 52 20 10 78 1 46 45 26 38 96 25 37 85 19 98 75`,
        `27 47 38 62 86 16 35 87 46 74 52 94 25 9 2 61 88 51 90 68 79 72 1 20 82`,
        `5 29 9 44 64 89 15 78 56 2 85 93 28 79 34 87 16 21 59 49 8 39 71 57 75`,
        `0 64 99 62 28 47 3 87 31 9 70 10 97 24 91 65 43 96 86 85 35 88 25 67 83`,
        `69 67 8 31 49 57 22 83 56 79 91 54 70 33 53 68 47 84 80 35 21 7 65 4 17`,
        `4 2 18 62 13 74 31 60 59 16 71 43 86 17 93 70 81 50 53 64 51 96 49 7 47`,
        `51 96 12 23 18 27 2 35 55 50 92 44 4 49 85 40 58 6 13 16 98 5 48 74 57`,
        `88 3 15 45 95 59 2 58 98 77 62 89 80 11 74 10 49 48 72 76 86 61 53 60 44`,
        `77 85 1 3 76 94 30 83 6 39 80 92 24 31 46 64 47 65 7 84 23 86 79 82 34`,
        `99 5 2 23 53 78 79 55 96 84 91 43 47 69 63 80 29 94 14 32 1 18 90 28 68`,
        `29 51 43 17 0 4 44 48 93 40 52 11 75 50 88 34 95 47 68 55 84 54 19 12 5`,
        `26 98 34 92 53 80 69 68 5 71 1 30 61 15 56 96 22 52 70 25 93 7 36 18 55`,
        `19 16 4 32 55 61 66 67 50 88 89 51 64 57 43 87 31 49 85 9 90 39 56 96 59`,
        `25 59 57 10 52 8 50 28 71 3 99 78 47 31 42 0 82 98 93 2 89 81 55 76 13`,
        `19 81 93 25 20 87 70 42 38 44 33 98 62 91 39 49 80 47 56 28 92 46 8 78 75`,
        `70 86 32 10 83 30 62 99 45 88 6 5 43 22 16 57 48 49 18 68 33 28 80 94 9`,
        `85 65 83 59 44 52 24 87 31 56 17 94 73 43 58 10 23 46 36 89 53 28 63 62 70`,
        `72 7 99 40 77 68 71 12 19 97 54 73 64 43 11 44 29 58 75 78 21 6 30 90 28`,
        `97 32 21 48 25 67 58 64 0 1 50 49 27 70 43 76 22 12 51 37 93 20 62 36 26`,
        `76 69 52 2 67 13 18 1 62 81 94 43 99 10 45 17 55 19 44 78 46 3 16 74 73`,
        `23 17 66 2 78 44 53 67 19 69 94 43 85 34 14 26 63 40 1 27 95 48 20 72 64`,
        `49 96 17 42 53 8 15 62 3 90 9 57 61 82 46 95 44 75 27 23 10 6 24 63 98`,
        `80 35 65 55 37 64 91 77 3 94 46 24 97 87 78 60 2 61 23 32 51 92 59 73 25`,
        `68 5 32 99 70 18 43 96 63 52 88 3 59 76 25 65 48 72 2 24 67 41 60 44 87`,
        `12 48 72 86 93 27 36 96 51 21 2 50 34 83 6 49 65 32 42 87 88 10 43 84 22`,
        `78 70 44 10 80 18 71 17 50 27 12 46 88 6 91 98 0 31 85 56 92 53 72 77 28`,
        `85 84 6 89 24 15 41 21 92 71 88 90 95 32 98 46 60 35 38 17 36 66 93 70 40`,
        `54 5 41 59 76 38 47 48 51 71 80 96 39 85 0 68 61 55 40 13 78 94 99 19 30`,
        `50 3 55 37 25 16 59 48 52 13 41 20 46 27 39 90 80 30 84 93 22 12 79 74 0`,
        `16 97 4 58 80 68 49 0 87 35 88 63 1 36 74 45 91 55 46 75 22 17 43 19 71`,
        `30 98 31 63 16 62 6 3 9 67 61 11 29 66 52 80 97 42 72 76 78 57 90 13 89`,
        `40 22 8 11 43 90 61 29 10 88 69 86 74 26 70 14 51 93 32 80 84 75 81 72 16`,
        `91 22 89 72 82 63 58 80 42 45 11 40 29 41 90 17 16 62 14 35 23 4 65 79 0`,
        `32 76 30 8 90 0 89 1 95 48 40 44 68 49 37 35 26 81 51 21 47 19 83 91 71`,
        `9 31 70 42 16 82 4 84 54 45 58 36 53 20 44 26 5 69 90 52 95 67 51 7 76`,
        `5 64 51 63 8 80 22 85 35 16 31 99 68 53 65 58 2 32 83 59 92 93 18 56 62`,
        `32 94 9 68 79 26 34 7 1 0 95 56 69 29 20 18 55 25 15 88 54 97 61 51 10`,
        `25 9 1 70 80 14 75 58 30 81 45 19 2 41 95 93 21 74 7 59 34 89 52 78 54`,
        `81 1 61 92 51 97 35 3 7 39 76 62 32 26 90 71 72 19 31 15 45 57 82 14 24`,
        `66 6 27 11 81 40 60 48 75 91 86 31 62 36 72 54 76 25 44 74 84 29 20 53 68`,
        `80 33 97 7 51 74 66 6 67 83 76 68 87 90 91 2 53 49 31 82 72 95 26 28 22`,
        `33 1 93 2 8 7 19 6 51 47 63 68 26 90 54 59 22 9 46 28 40 20 80 86 15`,
        `47 5 23 64 31 54 44 51 14 21 24 25 93 62 0 41 15 56 91 40 48 17 69 11 81`,
        `59 27 47 82 44 78 89 34 1 23 31 91 35 30 52 48 15 32 43 5 42 41 12 53 77`,
        `83 8 74 12 4 45 56 22 68 50 99 2 55 62 90 36 14 3 33 93 43 26 85 96 61`,
        `13 33 85 32 84 41 66 48 9 11 70 80 45 82 34 74 94 67 58 98 89 8 39 51 64`,
        `20 23 32 57 52 17 7 86 90 75 78 44 43 41 12 29 92 0 35 48 15 61 42 74 21`,
        `76 92 73 16 2 78 18 91 86 51 70 66 11 12 79 44 28 49 56 80 64 74 67 46 20`,
        `56 87 96 62 53 63 7 47 39 66 61 78 23 33 10 65 76 19 3 94 25 84 90 68 79`,
        `33 79 70 88 61 99 23 76 37 66 16 81 67 46 49 91 73 83 44 18 28 59 85 55 21`,
        `15 44 70 23 43 94 48 8 77 28 53 63 17 83 69 25 74 40 11 35 78 36 31 85 84`,
        `73 80 31 90 20 53 60 1 87 33 51 89 47 32 22 71 15 55 26 5 77 81 39 11 94`,
        `2 15 79 22 50 63 8 66 53 13 26 4 16 20 59 47 93 80 77 38 7 52 92 74 99`,
        `68 10 22 61 7 50 63 93 27 54 32 79 20 62 88 13 77 64 89 65 97 41 39 38 75`,
        `81 29 64 14 80 25 57 94 13 60 58 33 63 98 42 46 10 17 76 61 2 1 68 56 45`,
        `49 23 82 10 56 71 25 85 26 58 65 37 88 7 3 34 80 66 63 74 57 51 35 39 91`,
        `35 48 3 22 38 49 19 71 55 62 34 96 69 32 58 40 81 56 36 50 15 52 46 53 90`,
        `25 5 93 72 26 88 84 75 87 34 69 60 79 48 50 27 73 33 55 47 65 62 74 46 4`,
        `86 82 78 17 16 72 36 76 20 68 69 95 58 37 80 92 97 28 30 7 6 15 8 57 54`,
        `50 64 61 0 66 33 44 46 16 17 85 67 76 30 28 25 69 82 54 2 24 96 5 68 6`,
        `7 98 31 2 11 13 92 4 72 73 62 29 15 47 40 21 90 57 89 76 81 66 88 12 82`,
        `37 45 19 78 73 82 68 96 26 51 35 28 13 12 98 40 47 59 10 18 3 88 6 69 29`,
        `62 45 2 46 90 52 25 50 13 1 64 47 73 54 79 33 36 92 15 77 28 4 83 63 5`,
        `72 63 57 95 16 17 70 48 23 39 65 96 87 85 33 75 81 82 64 19 80 66 5 58 83`,
        `19 9 40 16 33 51 87 66 59 49 94 61 83 81 2 84 27 63 54 10 8 95 88 42 6`,
        `4 37 62 80 10 35 98 27 93 69 96 43 65 90 1 23 60 53 44 99 28 38 68 17 71`,
        `61 45 93 95 91 35 43 76 98 41 89 21 87 23 99 8 81 58 12 0 32 24 15 70 96`,
        `91 59 26 69 61 16 2 45 34 66 95 62 78 82 12 98 41 30 49 50 32 22 53 8 7`,
        `94 50 23 64 46 90 19 68 93 76 63 49 9 44 89 83 88 36 55 6 22 14 85 58 70`,
        `89 97 86 21 4 57 29 17 46 22 25 10 49 74 63 24 23 93 56 11 37 48 82 55 88`,]
}

export default PuzzleInput