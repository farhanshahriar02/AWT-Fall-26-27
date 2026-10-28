"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateNested = ValidateNested;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
/**
 * @decorator
 * @description A custom decorator to validate a validation-schema within a validation schema upload N levels
 * @param schema The validation Class
 */
function ValidateNested(schema, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "ValidateNested",
            target: object === null || object === void 0 ? void 0 : object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate: function (value, args) {
                    args.value;
                    if (Array.isArray(value)) {
                        for (var i = 0; i < value.length; i++) {
                            if ((0, class_validator_1.validateSync)((0, class_transformer_1.plainToClass)(schema, value[i])).length) {
                                return false;
                            }
                        }
                        return true;
                    }
                    else
                        return (0, class_validator_1.validateSync)((0, class_transformer_1.plainToClass)(schema, value)).length
                            ? false
                            : true;
                },
                defaultMessage: function (args) {
                    if (Array.isArray(args === null || args === void 0 ? void 0 : args.value)) {
                        for (var i = 0; i < (args === null || args === void 0 ? void 0 : args.value).length; i++) {
                            return ("".concat(args === null || args === void 0 ? void 0 : args.property, "::index").concat(i, " -> ") +
                                (0, class_validator_1.validateSync)((0, class_transformer_1.plainToClass)(schema, args === null || args === void 0 ? void 0 : args.value[i]))
                                    .map(function (e) { return e.constraints; })
                                    .reduce(function (acc, next) { return acc.concat(Object.values(next !== null && next !== void 0 ? next : "")); }, [])
                                    .toString());
                        }
                    }
                    else
                        return ("".concat(args === null || args === void 0 ? void 0 : args.property, ": ") +
                            (0, class_validator_1.validateSync)((0, class_transformer_1.plainToClass)(schema, args === null || args === void 0 ? void 0 : args.value))
                                .map(function (e) { return e.constraints; })
                                .reduce(function (acc, next) { return acc.concat(Object.values(next !== null && next !== void 0 ? next : "")); }, [])).toString();
                    return "";
                },
            },
        });
    };
}
