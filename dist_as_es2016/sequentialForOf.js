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
exports.sequentialForOf = (promises) => __awaiter(this, void 0, void 0, function* () {
    const results = [];
    /* eslint-disable no-await-in-loop, no-restricted-syntax */
    for (const p of promises) {
        results.push(yield p());
    }
    /* eslint-enable no-await-in-loop, no-restricted-syntax */
    return results;
});
