"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncWrapper = void 0;
var asyncWrapper = function (fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    };
};
exports.asyncWrapper = asyncWrapper;
