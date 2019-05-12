export const sequentialReduce = async <T>(
  promises: (() => Promise<T>)[],
): Promise<T[]> => {
  const first = promises.shift()
  if (first == null) {
    return []
  }

  const results: T[] = []
  await promises
    // 末尾に空のPromiseがないと、最後のPromiseの結果をresultsにpushできないため
    .concat(() => Promise.resolve(undefined as any))
    .reduce(async (prev, next) => {
      const res = await prev
      results.push(res)
      return next()
    }, Promise.resolve(first()))

  return results
}
