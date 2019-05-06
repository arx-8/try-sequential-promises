export const sequential = async <T>(
  promises: (() => Promise<T>)[],
): Promise<T[]> => {
  const first = promises.shift()
  if (first == null) {
    return []
  }

  const results: T[] = []

  // 末尾に空のPromiseがないと、最後のPromiseの結果をresultsにpushできないため
  const adjusted = promises.concat(() => Promise.resolve(undefined as any))

  await adjusted.reduce(async (prev, next) => {
    const res = await prev
    results.push(res)
    return next()
  }, Promise.resolve(first()))

  return results
}
