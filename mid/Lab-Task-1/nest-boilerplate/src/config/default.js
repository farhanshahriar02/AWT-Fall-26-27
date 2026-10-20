"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function () { return ({
    rpc: {
        txSending: process.env.RPC_URL_1 || "default_tx_sending_url",
        fallbacks: {
            txSending: [process.env.RPC_URL_2],
        },
    },
}); });
