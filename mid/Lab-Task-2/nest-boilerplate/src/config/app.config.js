"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = exports.envSchema = void 0;
var zod_1 = require("zod");
var dotenv = require("dotenv");
var zod_validation_error_1 = require("zod-validation-error");
dotenv.config();
exports.envSchema = zod_1.default
    .object({
    REDIS_HOST: zod_1.default.string().default("localhost"),
    REDIS_PORT: zod_1.default.coerce.number().default(6379),
    REDIS_PASSWORD: zod_1.default.string().optional(),
    DEBUG_LOG: zod_1.default.coerce.boolean().default(false),
    WARN_LOG: zod_1.default.coerce.boolean().default(true),
    ERROR_LOG: zod_1.default.coerce.boolean().default(true),
    REQ_LOG: zod_1.default.coerce.boolean().default(true),
    LOG_FILE: zod_1.default.coerce.boolean().default(true),
    JWT_BEARER_SECRET: zod_1.default.string(),
    AUTH_SERVER_AUDIENCE: zod_1.default.string().optional(),
    JWT_TTL: zod_1.default.coerce.number().default(86400 * 365),
    PORT: zod_1.default.coerce.number().default(5000),
    NODE_ENV: zod_1.default.enum(["development", "production"]).default("development"),
    APP_ENV: zod_1.default.enum(["local", "dev", "prod"]).default("local"),
    MAILER_HOST: zod_1.default.string(),
    MAILER_PORT: zod_1.default.coerce.number(),
    MAILER_SECURE: zod_1.default.coerce.boolean(),
    MAILER_USER: zod_1.default.string(),
    MAILER_PASSWORD: zod_1.default.string(),
    MAILER_FROM: zod_1.default.string(),
    BULB_REWARD_INTERVAL_SECOND: zod_1.default.coerce.number().default(7 * 86400),
    BLOCK_QUERY_INTERVAL: zod_1.default.coerce.number().default(10000),
    LONG_BREAK_THRESHOLD_IN_SECONDS: zod_1.default.coerce.number().default(18 * 60 * 60), // 18Hours
    FRONTEND_URL: zod_1.default.string().default("http://localhost:3000"),
    RTC_PORT_MIN: zod_1.default.coerce.number().default(10000),
    RTC_PORT_MAX: zod_1.default.coerce.number().default(10100),
    NETWORK_NAME: zod_1.default.string().default("mainnet"),
    CHAIN_ID: zod_1.default.coerce.number().default(1),
    PRIVATE_KEY: zod_1.default.string().optional(),
})
    .transform(function (envs) {
    return __assign(__assign({}, envs), { REDIS_URL: !!envs.REDIS_PASSWORD
            ? "redis://:".concat(envs.REDIS_PASSWORD, "@").concat(envs.REDIS_HOST, ":").concat(envs.REDIS_PORT)
            : "redis://".concat(envs.REDIS_HOST, ":").concat(envs.REDIS_PORT) });
});
var env = (function () {
    try {
        return exports.envSchema.parse(Object.entries(process.env).reduce(function (prev, _a) {
            var _b;
            var key = _a[0], val = _a[1];
            return (__assign(__assign({}, prev), (_b = {}, _b[key] = (function () {
                try {
                    if (val)
                        return JSON.parse(val);
                    return val;
                }
                catch (error) {
                    return val;
                }
            })(), _b)));
        }, {}));
    }
    catch (error) {
        if (error instanceof zod_1.ZodError)
            throw new Error("ENV ".concat((0, zod_validation_error_1.fromZodError)(error).message));
        else
            throw new Error("ENV ".concat(error));
    }
})();
exports.appConfig = {
    default_schema_identifier: "public",
    default_migrations_folder: __dirname + "/../database/migrations",
    default_seeders_folder: __dirname + "/../database/seeders",
    tenant_migrations_folder: __dirname + "/../database/tenant_migrations",
    tenant_seeders_folder: __dirname + "/../database/tenant_seeders",
    recommended_bycrypt_rounds: 12,
    email_from: "mailer@schmserver.com",
    env: env,
};
