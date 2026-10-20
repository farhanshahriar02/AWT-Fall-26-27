"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = void 0;
var getCurrentUser = function (req) {
    if (!req.user)
        return "You are not authenticated";
    var id = req.user.id;
    if (!id)
        return "Invalid token";
    return req.user;
};
exports.getCurrentUser = getCurrentUser;
