import { sequentialForOf as sequential } from "./sequentialForOf"

describe("sequential", () => {
  it("empty", async () => {
    // ## Arrange ##
    const promises: any[] = []

    // ## Act ##
    const results = await sequential(promises)

    // ## Assert ##
    expect(results).toStrictEqual([])
  })

  it("multiple", async () => {
    // ## Arrange ##
    const promises = [fetchObject1, fetchObject2, fetchObject3]
    const startMilliSecs = new Date().getTime()

    // ## Act ##
    const results = await sequential(promises)

    // ## Assert ##
    // 順次実行されてること = fetchの合計以上の処理時間が掛かってること
    const endMilliSecs = new Date().getTime()
    const processingTime = endMilliSecs - startMilliSecs
    // なぜか 1ms 早く完了してしまうことがあるため、閾値を -1ms してる
    const isValidProcessingTime = 3000 - 1 <= processingTime
    if (!isValidProcessingTime) {
      console.log(`startMilliSecs: ${startMilliSecs}`)
      console.log(`endMilliSecs: ${endMilliSecs}`)
      console.log(`processingTime: ${processingTime}`)
    }
    expect(isValidProcessingTime).toStrictEqual(true)
    expect(results).toStrictEqual([
      {
        result: "Hello world 1!",
      },
      {
        result: "Hello world 2!",
      },
      {
        result: "Hello world 3!",
      },
    ])
  })

  it("various types", async () => {
    // ## Arrange ##
    const promises: (() => Promise<number | string | number[]>)[] = [
      () => Promise.resolve(1),
      () => Promise.resolve("str"),
      () => Promise.resolve([1, 2, 3]),
    ]

    // ## Act ##
    const results = await sequential(promises)

    // ## Assert ##
    expect(results).toStrictEqual([1, "str", [1, 2, 3]])
  })

  it("sequential & parallel", async () => {
    // ## Arrange ##
    const promises: (() => Promise<FetchResult | FetchResult[]>)[] = [
      fetchObject1,
      async () => {
        return Promise.all([
          fetchObject1(),
          fetchObject2(),
          fetchObject3(),
          fetchObject1(),
          fetchObject2(),
          fetchObject3(),
        ])
      },
      fetchObject1,
    ]
    const startMilliSecs = new Date().getTime()

    // ## Act ##
    const results = await sequential(promises)

    // ## Assert ##
    // 1seq + 6para + 1seq = 3000 ~ 4000 milliSecs で終わるはず
    const endMilliSecs = new Date().getTime()
    const processingTime = endMilliSecs - startMilliSecs
    const isValidProcessingTime =
      3000 - 1 <= processingTime && processingTime < 4000
    if (!isValidProcessingTime) {
      console.log(`startMilliSecs: ${startMilliSecs}`)
      console.log(`endMilliSecs: ${endMilliSecs}`)
      console.log(`processingTime: ${processingTime}`)
    }
    expect(isValidProcessingTime).toStrictEqual(true)
    expect(results).toStrictEqual([
      {
        result: "Hello world 1!",
      },
      [
        {
          result: "Hello world 1!",
        },
        {
          result: "Hello world 2!",
        },
        {
          result: "Hello world 3!",
        },
        {
          result: "Hello world 1!",
        },
        {
          result: "Hello world 2!",
        },
        {
          result: "Hello world 3!",
        },
      ],
      {
        result: "Hello world 1!",
      },
    ])
  })

  it("side-effect", async () => {
    // ## Arrange ##
    const results1: FetchResult[] = []
    const promises = [
      async () => {
        results1.push(await fetchObject1())
      },
      async () => {
        results1.push(await fetchObject2())
      },
    ]
    const startMilliSecs = new Date().getTime()

    // ## Act ##
    const results2 = await sequential(promises)

    // ## Assert ##
    const endMilliSecs = new Date().getTime()
    const processingTime = endMilliSecs - startMilliSecs
    const isValidProcessingTime = 2000 - 1 <= processingTime
    if (!isValidProcessingTime) {
      console.log(`startMilliSecs: ${startMilliSecs}`)
      console.log(`endMilliSecs: ${endMilliSecs}`)
      console.log(`processingTime: ${processingTime}`)
    }
    expect(isValidProcessingTime).toStrictEqual(true)
    expect(results1).toStrictEqual([
      {
        result: "Hello world 1!",
      },
      {
        result: "Hello world 2!",
      },
    ])
    expect(results2).toStrictEqual([undefined, undefined])
  })

  it("error", async (done) => {
    // ## Arrange ##
    const promises = [fetchObject1, fetchObject2, fetchFail, fetchObject3]
    const startMilliSecs = new Date().getTime()

    // ## Act ##
    try {
      await sequential(promises)
    } catch (error) {
      expect(error.message).toStrictEqual("Failed!")
      done()
    }

    // ## Assert ##
    // 順次実行されてること = エラー直前までのfetchの合計以上の処理時間が掛かってること
    const endMilliSecs = new Date().getTime()
    const processingTime = endMilliSecs - startMilliSecs
    const isValidProcessingTime = 3000 - 1 <= processingTime
    if (!isValidProcessingTime) {
      console.log(`startMilliSecs: ${startMilliSecs}`)
      console.log(`endMilliSecs: ${endMilliSecs}`)
      console.log(`processingTime: ${processingTime}`)
    }
    expect(isValidProcessingTime).toStrictEqual(true)
  })
})

const sleep = (milliSecs: number): Promise<void> => {
  // console.log(`--- waiting ${milliSecs} ---`)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, milliSecs)
  })
}

type FetchResult = {
  [key: string]: string
}

const fetchObject1 = async (): Promise<FetchResult> => {
  await sleep(1000)
  return {
    result: `Hello world 1!`,
  }
}

const fetchObject2 = async (): Promise<FetchResult> => {
  await sleep(1000)
  return {
    result: `Hello world 2!`,
  }
}

const fetchObject3 = async (): Promise<FetchResult> => {
  await sleep(1000)
  return {
    result: `Hello world 3!`,
  }
}

const fetchFail = async (): Promise<FetchResult> => {
  await sleep(1000)
  throw new Error("Failed!")
}
