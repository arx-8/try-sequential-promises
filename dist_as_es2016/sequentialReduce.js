"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequentialReduce = (promises) => __awaiter(this, void 0, void 0, function* () {
    const first = promises.shift();
    if (first == null) {
        return [];
    }
    const results = [];
    yield promises
        // 末尾に空のPromiseがないと、最後のPromiseの結果をresultsにpushできないため
        .concat(() => Promise.resolve(undefined))
        .reduce((prev, next) => __awaiter(this, void 0, void 0, function* () {
        const res = yield prev;
        results.push(res);
        return next();
    }), Promise.resolve(first()));
    return results;
});
