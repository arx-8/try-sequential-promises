"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequentialReduce = async (promises) => {
    const first = promises.shift();
    if (first == null) {
        return [];
    }
    const results = [];
    await promises
        // 末尾に空のPromiseがないと、最後のPromiseの結果をresultsにpushできないため
        .concat(() => Promise.resolve(undefined))
        .reduce(async (prev, next) => {
        const res = await prev;
        results.push(res);
        return next();
    }, Promise.resolve(first()));
    return results;
};
