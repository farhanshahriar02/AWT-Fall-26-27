"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = exports.SnakeNamingStrategy = void 0;
var typeorm_1 = require("typeorm");
var StringUtils_1 = require("typeorm/util/StringUtils");
var dotenv = require("dotenv");
dotenv.config();
/**
 * Snake naming will be used in database operations
 */
var SnakeNamingStrategy = /** @class */ (function (_super) {
    __extends(SnakeNamingStrategy, _super);
    function SnakeNamingStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SnakeNamingStrategy.prototype.tableName = function (className, customName) {
        if (customName)
            return customName;
        var snakeCasedClassName = (0, StringUtils_1.snakeCase)(className);
        var splittedClassName = snakeCasedClassName.split("_");
        var lastWord = splittedClassName[splittedClassName.length];
        switch (lastWord) {
            case "status":
                return "".concat(snakeCasedClassName, "es");
            default:
                return "".concat(snakeCasedClassName, "s");
        }
    };
    SnakeNamingStrategy.prototype.columnName = function (propertyName, customName, embeddedPrefixes) {
        return ((0, StringUtils_1.snakeCase)(embeddedPrefixes.join("_")) +
            (customName || (0, StringUtils_1.snakeCase)(propertyName)));
    };
    SnakeNamingStrategy.prototype.relationName = function (propertyName) {
        return (0, StringUtils_1.camelCase)(propertyName, true);
    };
    SnakeNamingStrategy.prototype.joinColumnName = function (relationName, referencedColumnName) {
        return (0, StringUtils_1.snakeCase)("".concat(relationName, "_").concat(referencedColumnName));
    };
    SnakeNamingStrategy.prototype.joinTableName = function (firstTableName, secondTableName, firstPropertyName) {
        return (0, StringUtils_1.snakeCase)("".concat(firstTableName, "_").concat(firstPropertyName.replace(/\./gi, "_"), "_").concat(secondTableName));
    };
    SnakeNamingStrategy.prototype.joinTableColumnName = function (tableName, propertyName, columnName) {
        return (0, StringUtils_1.snakeCase)("".concat(tableName, "_").concat(columnName || propertyName));
    };
    SnakeNamingStrategy.prototype.classTableInheritanceParentColumnName = function (parentTableName, parentTableIdPropertyName) {
        return (0, StringUtils_1.snakeCase)("".concat(parentTableName, "_").concat(parentTableIdPropertyName));
    };
    return SnakeNamingStrategy;
}(typeorm_1.DefaultNamingStrategy));
exports.SnakeNamingStrategy = SnakeNamingStrategy;
exports.dataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    schema: "public",
    entities: [__dirname + "/../modules/**/entities/*.entity.{ts,js}"],
    namingStrategy: new SnakeNamingStrategy(),
    migrations: [__dirname + "/../database/migrations/*.ts"],
    logging: process.env.NODE_DB_ENV
        ? process.env.NODE_DB_ENV == "development"
            ? false
            : false
        : false,
    synchronize: false,
};
exports.default = exports.dataSourceOptions;
