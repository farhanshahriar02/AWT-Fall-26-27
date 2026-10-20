"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwAxiosHttpException = throwAxiosHttpException;
var axios_1 = require("axios");
var common_1 = require("@nestjs/common");
function throwAxiosHttpException(error, fallbackMessage) {
    var _a, _b;
    if (fallbackMessage === void 0) { fallbackMessage = "External API error"; }
    if (axios_1.default.isAxiosError(error) && error.response) {
        var axiosError = error;
        var status_1 = ((_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.status) || 500;
        var data = ((_b = axiosError.response) === null || _b === void 0 ? void 0 : _b.data) || {};
        var description = data.description || data.message || fallbackMessage;
        throw new common_1.HttpException({
            statusCode: status_1,
            message: description,
            original: data,
        }, status_1);
    }
    // Fallback: unknown error → generic 500
    throw new common_1.HttpException({
        statusCode: 500,
        message: fallbackMessage,
    }, 500);
}
