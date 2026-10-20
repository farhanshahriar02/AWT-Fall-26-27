"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessEnv = void 0;
var ProcessEnv = /** @class */ (function () {
    function ProcessEnv() {
    }
    ProcessEnv.get = function (key) {
        return process.env[key];
    };
    ProcessEnv.isProduction = function () {
        return this.get("NODE_ENV") === "production";
    };
    return ProcessEnv;
}());
exports.ProcessEnv = ProcessEnv;
