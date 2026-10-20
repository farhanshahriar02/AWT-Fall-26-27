"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCacheService = void 0;
var config_1 = require("@/src/config");
var common_1 = require("@nestjs/common");
var redis_1 = require("redis");
var RedisCacheService = /** @class */ (function () {
    function RedisCacheService() {
        this.logger = new common_1.Logger(RedisCacheService_1.name);
        this.redisClient = (0, redis_1.createClient)({
            url: config_1.appConfig.env.REDIS_URL,
        });
    }
    RedisCacheService_1 = RedisCacheService;
    RedisCacheService.prototype.onModuleDestroy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.redisClient.disconnect()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RedisCacheService.prototype.onModuleInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.redisClient.on("error", function (err) {
                            return _this.logger.error("Redis Error : ".concat(err));
                        });
                        this.redisClient.on("ready", function () {
                            return _this.logger.log("Redis client connected");
                        });
                        this.redisClient.on("end", function () {
                            return _this.logger.log("Redis client disconnected");
                        });
                        return [4 /*yield*/, this.redisClient.connect()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RedisCacheService.prototype.getClient = function () {
        return this.redisClient;
    };
    RedisCacheService.prototype.getIfCached = function (key, ttl, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var updateCacheAndGetData, cachedData;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updateCacheAndGetData = function () { return __awaiter(_this, void 0, void 0, function () {
                            var data;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, callback()];
                                    case 1:
                                        data = _a.sent();
                                        this.redisClient.set(key, JSON.stringify(data), ttl === -1 ? undefined : { EX: ttl });
                                        return [2 /*return*/, data];
                                }
                            });
                        }); };
                        return [4 /*yield*/, this.redisClient.get(key)];
                    case 1:
                        cachedData = _a.sent();
                        if (!!cachedData && typeof cachedData === "string")
                            return [2 /*return*/, JSON.parse(cachedData)];
                        return [4 /*yield*/, updateCacheAndGetData()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RedisCacheService.prototype.getCachedOr = function (key, defaultValue, updateOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var cachedData;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.redisClient.get(key)];
                    case 1:
                        cachedData = _a.sent();
                        if (updateOptions)
                            (function () { return __awaiter(_this, void 0, void 0, function () {
                                var callback, ttl, data;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            callback = updateOptions.callback, ttl = updateOptions.ttl;
                                            return [4 /*yield*/, callback()];
                                        case 1:
                                            data = _a.sent();
                                            this.redisClient.set(key, JSON.stringify(data), ttl === -1 ? undefined : { EX: ttl });
                                            return [2 /*return*/, data];
                                    }
                                });
                            }); })();
                        if (!!cachedData && typeof cachedData === "string") {
                            return [2 /*return*/, JSON.parse(cachedData)];
                        }
                        return [2 /*return*/, defaultValue];
                }
            });
        });
    };
    RedisCacheService.prototype.cachedFetch = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var ttl = _b.ttl, url = _b.url;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getIfCached(url, ttl, function () { return __awaiter(_this, void 0, void 0, function () {
                            var response;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, fetch(url)];
                                    case 1:
                                        response = _a.sent();
                                        if (!response.ok) return [3 /*break*/, 3];
                                        return [4 /*yield*/, response.json()];
                                    case 2: return [2 /*return*/, _a.sent()];
                                    case 3: throw response.text();
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    var RedisCacheService_1;
    RedisCacheService = RedisCacheService_1 = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [])
    ], RedisCacheService);
    return RedisCacheService;
}());
exports.RedisCacheService = RedisCacheService;
