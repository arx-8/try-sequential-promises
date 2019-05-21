export const sequentialReduce = <T>(
  promises: (() => Promise<T>)[],
): Promise<T[]> => {
  return promises.reduce(async (res, next) => {
    const r = await res
    r.push(await next())
    return r
  }, Promise.resolve([] as T[]))
}
