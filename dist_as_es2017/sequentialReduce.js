"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequentialReduce = (promises) => {
    return promises.reduce(async (res, next) => {
        const r = await res;
        r.push(await next());
        return r;
    }, Promise.resolve([]));
};
