"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequentialReduceNoAsync = function (promises) {
    var first = promises.shift();
    if (first == null) {
        return Promise.resolve([]);
    }
    return new Promise(function (resolve, reject) {
        var results = [];
        promises
            // 末尾に空のPromiseがないと、最後のPromiseの結果をresultsにpushできないため
            .concat(function () { return Promise.resolve(undefined); })
            .reduce(function (prev, next) {
            return prev
                .then(function (res) {
                results.push(res);
                return next();
            })
                .catch(function (reason) {
                reject(reason);
                // for suppress type error
                return Promise.resolve(undefined);
            });
        }, Promise.resolve(first()))
            .then(function () {
            resolve(results);
        });
    });
};
