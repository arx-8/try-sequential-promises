export const sequential = async <T>(
  promises: (() => Promise<T>)[],
): Promise<T[]> => {
  const results: T[] = []

  await promises
    // 末尾に空のPromiseがないと、最後のPromiseの結果をresultsにpushできないため
    .concat(() => Promise.resolve(null as any))
    .reduce(async (prev, next) => {
      const res = await prev
      results.push(res)
      return next()
    }, Promise.resolve(null as any))

  // reduceの第2引数(初期値)にnullを入れてる。それを捨てるため。
  results.shift()

  return results
}
