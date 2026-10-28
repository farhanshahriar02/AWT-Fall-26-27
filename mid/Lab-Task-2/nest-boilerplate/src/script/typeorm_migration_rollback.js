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
var database_config_1 = require("@/config/database.config");
var typeorm_1 = require("typeorm");
var migrateRollback = function () {
    console.log("Rolling back.....");
    var ds = new typeorm_1.DataSource(__assign({}, database_config_1.dataSourceOptions));
    ds.initialize()
        .then(function () {
        ds.undoLastMigration()
            .then(function () {
            console.log("rollback completed");
        })
            .catch(function (err) { return console.error(err); });
    })
        .catch(function (err) { return console.error(err); });
};
migrateRollback();
