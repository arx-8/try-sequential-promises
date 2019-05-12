"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.func = function () {
    var list = [0, 1, 2];
    /* eslint-disable no-await-in-loop, no-restricted-syntax */
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var num = list_1[_i];
        console.log(num);
    }
    /* eslint-enable no-await-in-loop, no-restricted-syntax */
};
