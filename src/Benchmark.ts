import Benchmark from "benchmark"
import fs from "fs"
import { sequentialForOf } from "./sequentialForOf"
import { sequentialReduce } from "./sequentialReduce"
import { sequentialReduceNoAsync } from "./sequentialReduceNoAsync"
import { sequentialWhile } from "./sequentialWhile"

console.log("Start benchmark")

const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
const testFunc = (): Promise<void> => sleep(10)
const testData: (typeof testFunc)[] = []
for (let index = 0; index <= 100; index += 1) {
  testData.push(testFunc)
}

console.log("Created test data")

/**
 * @see https://github.com/bestiejs/benchmark.js/issues/172
 */
Benchmark.options.minSamples = 100

let logStr = ""
const suite = new Benchmark.Suite()

suite
  .add("Warm-up", async () => {
    await testFunc()
  })
  // add cases
  .add("sequentialReduce", async () => {
    await sequentialReduce(testData)
  })
  .add("sequentialReduceNoAsync", async () => {
    await sequentialReduceNoAsync(testData)
  })
  .add("sequentialForOf", async () => {
    await sequentialForOf(testData)
  })
  .add("sequentialWhile", async () => {
    await sequentialWhile(testData)
  })
  // add listeners
  /**
   * @see https://benchmarkjs.com/docs#options_onCycle
   */
  .on("cycle", (event: any) => {
    console.log(String(event.target))
    logStr += `${String(event.target)}\n`
  })
  /**
   * @see https://benchmarkjs.com/docs#options_onComplete
   */
  // eslint-disable-next-line func-names
  .on("complete", function(this: Record<string, any>) {
    console.log(`Fastest is *** ${this.filter("fastest").map("name")} ***`)
    logStr += `Fastest is *** ${this.filter("fastest").map("name")} ***\n`

    // 実行結果をファイルに出力
    const nowStr = new Date().toISOString().replace(/:/g, "")
    fs.writeFileSync(`benchmark_${nowStr}.txt`, logStr)
  })
  .run({ async: true })
