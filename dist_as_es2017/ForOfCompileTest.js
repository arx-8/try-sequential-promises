"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.func = () => {
    const list = [0, 1, 2];
    /* eslint-disable no-await-in-loop, no-restricted-syntax */
    for (const num of list) {
        console.log(num);
    }
    /* eslint-enable no-await-in-loop, no-restricted-syntax */
};
