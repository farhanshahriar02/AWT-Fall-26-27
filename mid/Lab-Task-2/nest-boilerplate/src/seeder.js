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
var nestjs_seeder_1 = require("nestjs-seeder");
var typeorm_1 = require("@nestjs/typeorm");
var database_config_1 = require("./config/database.config");
(0, nestjs_seeder_1.seeder)({
    imports: [
        typeorm_1.TypeOrmModule.forRoot(__assign(__assign({}, database_config_1.default), { entities: [__dirname + "/database/factories/*.factory.{ts,js}"] })),
        typeorm_1.TypeOrmModule.forFeature([]),
    ],
}).run([]);
