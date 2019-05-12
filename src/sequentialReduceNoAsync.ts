export const sequentialReduceNoAsync = <T>(
  promises: (() => Promise<T>)[],
): Promise<T[]> => {
  const first = promises.shift()
  if (first == null) {
    return Promise.resolve([])
  }

  return new Promise((resolve, reject) => {
    const results: T[] = []
    promises
      // 末尾に空のPromiseがないと、最後のPromiseの結果をresultsにpushできないため
      .concat(() => Promise.resolve(undefined as any))
      .reduce((prev, next) => {
        return prev
          .then((res) => {
            results.push(res)
            return next()
          })
          .catch((reason) => {
            reject(reason)
            // for suppress type error
            return Promise.resolve(undefined as any)
          })
      }, Promise.resolve(first()))
      .then(() => {
        resolve(results)
      })
  })
}
