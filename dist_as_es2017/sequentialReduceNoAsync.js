"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequentialReduceNoAsync = (promises) => {
    const first = promises.shift();
    if (first == null) {
        return Promise.resolve([]);
    }
    return new Promise((resolve, reject) => {
        const results = [];
        promises
            // 末尾に空のPromiseがないと、最後のPromiseの結果をresultsにpushできないため
            .concat(() => Promise.resolve(undefined))
            .reduce((prev, next) => {
            return prev
                .then((res) => {
                results.push(res);
                return next();
            })
                .catch((reason) => {
                reject(reason);
                // for suppress type error
                return Promise.resolve(undefined);
            });
        }, Promise.resolve(first()))
            .then(() => {
            resolve(results);
        });
    });
};
