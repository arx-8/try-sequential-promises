REM yeah

cd /d X:\dev\try-sequential-promises\dist_as_es5
for /l %%i in (0, 1, 4) do (
    start /wait ^
        /high ^
        /affinity 1 ^
        node Benchmark.js
)

cd /d X:\dev\try-sequential-promises\dist_as_es2016
for /l %%i in (0, 1, 4) do (
    start /wait ^
        /high ^
        /affinity 1 ^
        node Benchmark.js
)

cd /d X:\dev\try-sequential-promises\dist_as_es2017
for /l %%i in (0, 1, 4) do (
    start /wait ^
        /high ^
        /affinity 1 ^
        node Benchmark.js
)
