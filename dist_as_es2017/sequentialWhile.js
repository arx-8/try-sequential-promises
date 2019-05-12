"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequentialWhile = async (promises) => {
    const results = [];
    /* eslint-disable no-await-in-loop */
    let index = 0;
    const maxIndex = promises.length;
    while (index !== maxIndex) {
        const p = promises[index];
        results.push(await p());
        index += 1;
    }
    /* eslint-enable no-await-in-loop */
    return results;
};
