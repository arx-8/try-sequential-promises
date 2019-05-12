export const sequentialWhile = async <T>(
  promises: (() => Promise<T>)[],
): Promise<T[]> => {
  const results: T[] = []

  /* eslint-disable no-await-in-loop */
  let index = 0
  const maxIndex = promises.length
  while (index !== maxIndex) {
    const p = promises[index]
    results.push(await p())
    index += 1
  }
  /* eslint-enable no-await-in-loop */

  return results
}
