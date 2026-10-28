"use strict";
//#region Types
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = exports.Dictionary = void 0;
//#endregion
var Dictionary = /** @class */ (function () {
    function Dictionary(_record) {
        if (_record)
            this.record = _record;
        else
            this.clear();
        this.record = _record;
    }
    Dictionary.prototype.add = function (key, value) {
        if (this.record) {
            this.record[key] = value;
        }
    };
    Dictionary.prototype.includesKey = function (_key) {
        var _a;
        return typeof ((_a = this.record) === null || _a === void 0 ? void 0 : _a[_key]) !== "undefined";
    };
    Dictionary.prototype.includesValue = function (_value, _comparer) {
        var comparer = _comparer !== null && _comparer !== void 0 ? _comparer : (function (x, y) { return x === y; });
        if (this.values) {
            return this.values.some(function (x) { return comparer(x, _value); });
        }
    };
    Dictionary.prototype.clear = function () {
        this.record = {};
    };
    Object.defineProperty(Dictionary.prototype, "keys", {
        get: function () {
            if (this.record) {
                return Object.keys(this.record).map(function (x) { return x; });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Dictionary.prototype, "values", {
        get: function () {
            if (this.record) {
                return Object.values(this.record);
            }
        },
        enumerable: false,
        configurable: true
    });
    Dictionary.prototype.valueOf = function () {
        if (this.record) {
            return this.record;
        }
    };
    Dictionary.prototype.entries = function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, this.record];
        });
    };
    Dictionary.prototype.toString = function () {
        return JSON.stringify(this.record);
    };
    return Dictionary;
}());
exports.Dictionary = Dictionary;
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var _this = this;
        if (items && items.length === 1 && typeof items === "number")
            _this = _super.call(this, items[0]) || this;
        else
            _this = _super.apply(this, items) || this;
        return _this;
    }
    List.prototype.pushRange = function (items) {
        return this.push.apply(this, items);
    };
    List.prototype.toSet = function () {
        return new Set(this);
    };
    List.prototype.intersect = function (second, comparer) {
        comparer !== null && comparer !== void 0 ? comparer : (comparer = function (x, y) { return x === y; });
        return new (List.bind.apply(List, __spreadArray([void 0], this.filter(function (x) { return second.some(function (y) { return comparer(x, y); }); }), false)))();
    };
    List.prototype.groupBy = function (keySelector) {
        return new Dictionary(this.reduce(function (prev, curr) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[keySelector(curr)] = new (List.bind.apply(List, __spreadArray(__spreadArray([void 0], prev[keySelector(curr)], false), [curr], false)))(), _a)));
        }, {}));
    };
    List.prototype.distinct = function (by) {
        var comparer = by !== null && by !== void 0 ? by : (function (x, y) { return x === y; });
        return new (List.bind.apply(List, __spreadArray([void 0], this.reduce(function (prev, curr, _, arr) {
            return arr.some(function (x) { return comparer(x, curr); }) ? prev : __spreadArray(__spreadArray([], prev, true), [curr], false);
        }, []), false)))();
    };
    List.prototype.union = function (second) {
        return new (List.bind.apply(List, __spreadArray(__spreadArray([void 0], this, false), second, false)))().distinct();
    };
    return List;
}(Array));
exports.List = List;
