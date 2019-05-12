export const sequentialForOf = async <T>(
  promises: (() => Promise<T>)[],
): Promise<T[]> => {
  const results: T[] = []

  /* eslint-disable no-await-in-loop, no-restricted-syntax */
  for (const p of promises) {
    results.push(await p())
  }
  /* eslint-enable no-await-in-loop, no-restricted-syntax */

  return results
}
