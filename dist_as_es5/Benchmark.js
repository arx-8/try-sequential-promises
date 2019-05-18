"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const benchmark_1 = __importDefault(require("benchmark"));
const fs_1 = __importDefault(require("fs"));
const sequentialForOf_1 = require("./sequentialForOf");
const sequentialReduce_1 = require("./sequentialReduce");
const sequentialReduceNoAsync_1 = require("./sequentialReduceNoAsync");
const sequentialWhile_1 = require("./sequentialWhile");
console.log("Start benchmark");
const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
const testFunc = () => sleep(10);
const testData = [];
for (let index = 0; index <= 100; index += 1) {
    testData.push(testFunc);
}
console.log("Created test data");
/**
 * @see https://github.com/bestiejs/benchmark.js/issues/172
 */
benchmark_1.default.options.minSamples = 100;
let logStr = "";
const suite = new benchmark_1.default.Suite();
suite
    .add("Warm-up", async () => {
    await testFunc();
})
    // add cases
    .add("sequentialReduce", async () => {
    await sequentialReduce_1.sequentialReduce(testData);
})
    .add("sequentialReduceNoAsync", async () => {
    await sequentialReduceNoAsync_1.sequentialReduceNoAsync(testData);
})
    .add("sequentialForOf", async () => {
    await sequentialForOf_1.sequentialForOf(testData);
})
    .add("sequentialWhile", async () => {
    await sequentialWhile_1.sequentialWhile(testData);
})
    // add listeners
    /**
     * @see https://benchmarkjs.com/docs#options_onCycle
     */
    .on("cycle", (event) => {
    console.log(String(event.target));
    logStr += `${String(event.target)}\n`;
})
    /**
     * @see https://benchmarkjs.com/docs#options_onComplete
     */
    // eslint-disable-next-line func-names
    .on("complete", function () {
    console.log(`Fastest is *** ${this.filter("fastest").map("name")} ***`);
    logStr += `Fastest is *** ${this.filter("fastest").map("name")} ***\n`;
    // 実行結果をファイルに出力
    const nowStr = new Date().toISOString().replace(/:/g, "");
    fs_1.default.writeFileSync(`benchmark_${nowStr}.txt`, logStr);
})
    .run({ async: true });
