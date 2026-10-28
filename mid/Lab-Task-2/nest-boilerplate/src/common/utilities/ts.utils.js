"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _global = global;
_global.nameof = function (nameFn) {
    var _a, _b;
    return (_b = (_a = /return (.*);/.exec(nameFn.toString())) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : "";
};
