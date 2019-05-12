"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequentialForOf = async (promises) => {
    const results = [];
    /* eslint-disable no-await-in-loop, no-restricted-syntax */
    for (const p of promises) {
        results.push(await p());
    }
    /* eslint-enable no-await-in-loop, no-restricted-syntax */
    return results;
};
