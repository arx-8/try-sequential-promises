This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

node version: 8.10 or higher.

```sh
npm i
```

## Available Scripts

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm t`

shorthand for `npm test`

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Benchmark

より正確なベンチマーク結果を出すため、使用するCPUのコア数を1つに制限して実行する

### ts 直で実行の場合

```bat
REM 実行コマンドラインを取得するため、試しに実行してみる
npm run ben src/Benchmark.ts
wmic process where caption="node.exe" get commandline

REM 実行
cd /d X:\dev\try-sequential-promises
for /l %i in (0, 1, 4) do (
    start /wait ^
        /high ^
        /affinity 1 ^
        node ".\node_modules\.bin\\..\ts-node\dist\bin.js" ^
            --transpile-only ^
            --project tsconfig.benchmark.json ^
            "src/Benchmark.ts"
)
```

### トランスパイル結果の js を実行の場合

```bat
cd /d X:\dev\try-sequential-promises\dist_as_es5
for /l %i in (0, 1, 4) do (
    start /wait ^
        /high ^
        /affinity 1 ^
        node Benchmark.js
)
```
