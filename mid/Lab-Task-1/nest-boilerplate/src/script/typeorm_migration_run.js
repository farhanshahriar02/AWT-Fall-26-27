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
var _1 = require("@/config/.");
var typeorm_1 = require("typeorm");
var migrateRun = function () {
    console.log("Migrating.....");
    var ds = new typeorm_1.DataSource(__assign({}, _1.dataSourceOptions));
    ds.initialize()
        .then(function () {
        ds.runMigrations()
            .then(function () {
            console.log("migration completed");
        })
            .catch(function (err) { return console.error(err); });
    })
        .catch(function (err) { return console.error(err); });
};
migrateRun();
