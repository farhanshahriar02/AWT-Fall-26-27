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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFindOneOption = exports.makeFindOption = void 0;
var typeorm_1 = require("typeorm");
/**
 * Parse processable operation for TypeOrm from string
 * @date 2022-06-28
 * @param {any} operation:string
 * @param {any} value:string
 * @returns {FindOperator<any> | string | number}
 */
function operationParser(operation, value) {
    //TODO:Implement strategies to parse operation
    if (operation == "ltei") {
        return (0, typeorm_1.LessThanOrEqual)(parseInt(value));
    }
    else if (operation == "lte") {
        return (0, typeorm_1.LessThanOrEqual)(value);
    }
    else if (operation == "in") {
        return (0, typeorm_1.In)(JSON.parse(value));
    }
    return value;
}
/**
 * Takes query as parameters and returns undefined|FindManyOptions based on the query string
 * @param {QueryString} query
 * @param {string[]} search_fields - Array of fields to search
 * @returns {FindManyOptions | undefined}
 */
var makeFindOption = function (query, search_fields) {
    if (!query)
        return undefined;
    //since we will be using filters as a dynamic array so treat as a reserved word
    if (query.filters)
        throw { message: "Invalid Query String. filters is a reserved word" };
    var findOption = {};
    var q = query.q, attributes = query.attributes, include = query.include, limit = query.limit, offset = query.offset, sortBy = query.sortBy, filters = __rest(query, ["q", "attributes", "include", "limit", "offset", "sortBy"]);
    //if columns to select are specified then return them only
    if (attributes) {
        try {
            attributes = JSON.parse(attributes.toString());
        }
        catch (err) { }
        findOption.select = {};
        var selects = [];
        if (!Array.isArray(attributes) && typeof attributes !== "object")
            attributes = attributes.toString().split(",");
        if (!Array.isArray(attributes) && typeof attributes === "object")
            return;
        selects = attributes;
        selects.map(function (element) {
            var _a, _b;
            findOption.select = (_a = findOption.select) !== null && _a !== void 0 ? _a : {};
            //TODO:logic to perform any raw query if specified on the query string with the column name
            var _c = element.toString().split("."), levelOne = _c[0], levelTwo = _c[1], levelThree = _c[2];
            findOption.select[levelOne] = (_b = findOption.select[levelOne]) !== null && _b !== void 0 ? _b : true;
            if (levelTwo) {
                findOption.select[levelOne] =
                    findOption.select[levelOne] != true
                        ? findOption.select[levelOne]
                        : {};
                findOption.select[levelOne][levelTwo] = true;
                if (levelThree) {
                    findOption.select[levelOne][levelTwo] =
                        findOption.select[levelOne][levelTwo] != true
                            ? findOption.select[levelOne][levelTwo]
                            : {};
                    findOption.select[levelOne][levelTwo][levelThree] = true;
                }
            }
        });
    }
    //sort the result set by a column
    if (sortBy) {
        findOption.order = {};
        try {
            sortBy = JSON.parse(sortBy.toString());
        }
        catch (err) { }
        if (sortBy && !Array.isArray(sortBy)) {
            sortBy = [sortBy.toString()];
        }
        var s = sortBy;
        s.map(function (sort) {
            var _a;
            var _b = sort.toString().split(":"), field = _b[0], order = _b[1];
            findOption.order = __assign(__assign({}, findOption.order), (_a = {}, _a[field] = order == "desc" ? "desc" : "asc", _a));
        });
    }
    //number of rows to skip from beginning
    if (offset) {
        try {
            offset = JSON.parse(offset.toString());
        }
        catch (err) { }
        var skip = offset;
        if (Array.isArray(skip)) {
            findOption.skip = parseInt(skip[0]);
        }
        else {
            findOption.skip = parseInt(skip);
        }
    }
    //number of rows to return
    if (limit) {
        try {
            limit = JSON.parse(limit.toString());
        }
        catch (err) { }
        var take = limit;
        if (Array.isArray(take)) {
            findOption.take = parseInt(take[0]);
        }
        else {
            findOption.take = parseInt(take);
        }
    }
    //if any search string provided then generate OR query query using the provided search fields
    if (q) {
        var whereClauses_1 = [];
        try {
            q = JSON.parse(q.toString());
        }
        catch (err) { }
        var searchTerms = Array.isArray(q) ? q : [q];
        searchTerms.forEach(function (search) {
            var _a;
            var _b = search.toString().split(":"), field = _b[0], value = _b[1];
            if (value && search_fields.includes(field)) {
                whereClauses_1.push((_a = {}, _a[field] = (0, typeorm_1.ILike)("%" + value + "%"), _a));
            }
            else if (!value) {
                value = field;
                search_fields.forEach(function (sField) {
                    var _a;
                    whereClauses_1.push((_a = {}, _a[sField] = (0, typeorm_1.ILike)("%" + value + "%"), _a));
                });
                if (search_fields.includes("first_name") &&
                    search_fields.includes("last_name")) {
                    whereClauses_1.push({
                        first_name: (0, typeorm_1.Raw)(function (alias) {
                            return "(".concat(alias, " || ' ' || ").concat(alias.replace("first_name", "last_name"), ") ILIKE :value");
                        }, { value: "%".concat(value, "%") }),
                    });
                }
            }
        });
        findOption.where = whereClauses_1;
    }
    if (filters) {
        var parsedFilters_1 = {};
        Object.keys(filters).map(function (field) {
            var _a;
            var value = (_a = filters[field]) !== null && _a !== void 0 ? _a : "";
            if (Array.isArray(value))
                value = value[0];
            var _b = value.toString().split(":"), opOrVal = _b[0], val = _b[1];
            var comparingValue;
            if (!val) {
                comparingValue = opOrVal;
            }
            else {
                comparingValue = operationParser(opOrVal, val);
            }
            var _c = field.toString().split("."), levelOne = _c[0], levelTwo = _c[1], levelThree = _c[2];
            parsedFilters_1[levelOne] = comparingValue;
            if (levelTwo && levelTwo != "column") {
                parsedFilters_1[levelOne] = {};
                parsedFilters_1[levelOne][levelTwo] = comparingValue;
                if (levelThree) {
                    parsedFilters_1[levelOne][levelTwo] = {};
                    parsedFilters_1[levelOne][levelTwo][levelThree] = comparingValue;
                }
            }
        });
        if (!findOption.where) {
            findOption.where = __assign({}, parsedFilters_1);
        }
        else {
            findOption.where = findOption.where.map(function (where) {
                return __assign(__assign({}, where), parsedFilters_1);
            });
        }
    }
    //parse relationships
    if (include) {
        try {
            include = JSON.parse(include.toString());
        }
        catch (err) { }
        findOption.relations = {};
        var relations = [];
        if (!Array.isArray(include) && typeof include !== "object")
            include = include === null || include === void 0 ? void 0 : include.toString().split(",");
        if (!Array.isArray(include) && typeof include === "object")
            return;
        relations = include;
        //iterate all relationships and generate (both single and multilevel) relationship entry
        relations.forEach(function (element) {
            var _a, _b;
            var _c;
            if (!findOption.relations)
                findOption.relations = {};
            var _d = element.split("."), firstLevel = _d[0], secondLevel = _d[1];
            findOption.relations = __assign(__assign({}, findOption.relations), (_a = {}, _a[firstLevel] = secondLevel
                ? __assign(__assign({}, findOption.relations[firstLevel]), (_b = {}, _b[secondLevel] = true, _b)) : ((_c = findOption.relations[firstLevel]) !== null && _c !== void 0 ? _c : true), _a));
        });
    }
    return findOption;
};
exports.makeFindOption = makeFindOption;
/**
 * Takes query as parameters and returns undefined|FindOneOptions based on the query string
 * @param {QueryString} query
 * @returns {FindOneOptions | undefined}
 */
var makeFindOneOption = function (query) {
    if (!query)
        return undefined;
    var findOption = {};
    var attributes = query.attributes, include = query.include;
    //if columns to select are specified then return them only
    if (attributes) {
        try {
            attributes = JSON.parse(attributes.toString());
        }
        catch (err) { }
        findOption.select = {};
        var selects = [];
        if (!Array.isArray(attributes) && typeof attributes !== "object")
            attributes = attributes.toString().split(",");
        if (!Array.isArray(attributes) && typeof attributes === "object")
            return;
        selects = attributes;
        selects.map(function (element) {
            var _a, _b;
            findOption.select = (_a = findOption.select) !== null && _a !== void 0 ? _a : {};
            //TODO:logic to perform any raw query if specified on the query string with the column name
            var _c = element.toString().split("."), levelOne = _c[0], levelTwo = _c[1], levelThree = _c[2];
            findOption.select[levelOne] = (_b = findOption.select[levelOne]) !== null && _b !== void 0 ? _b : true;
            if (levelTwo) {
                findOption.select[levelOne] =
                    findOption.select[levelOne] != true
                        ? findOption.select[levelOne]
                        : {};
                findOption.select[levelOne][levelTwo] = true;
                if (levelThree) {
                    findOption.select[levelOne][levelTwo] =
                        findOption.select[levelOne][levelTwo] != true
                            ? findOption.select[levelOne][levelTwo]
                            : {};
                    findOption.select[levelOne][levelTwo][levelThree] = true;
                }
            }
        });
    }
    //parse relationships
    if (include) {
        try {
            include = JSON.parse(include.toString());
        }
        catch (err) { }
        findOption.relations = {};
        var relations = [];
        if (!Array.isArray(include) && typeof include !== "object")
            include = include === null || include === void 0 ? void 0 : include.toString().split(",");
        if (!Array.isArray(include) && typeof include === "object")
            return;
        relations = include;
        //iterate all relationships and generate (both single and multilevel) relationship entry
        relations.forEach(function (element) {
            var _a, _b;
            var _c;
            if (!findOption.relations)
                findOption.relations = {};
            var _d = element.split("."), firstLevel = _d[0], secondLevel = _d[1];
            findOption.relations = __assign(__assign({}, findOption.relations), (_a = {}, _a[firstLevel] = secondLevel
                ? __assign(__assign({}, findOption.relations[firstLevel]), (_b = {}, _b[secondLevel] = true, _b)) : ((_c = findOption.relations[firstLevel]) !== null && _c !== void 0 ? _c : true), _a));
        });
    }
    return findOption;
};
exports.makeFindOneOption = makeFindOneOption;
