"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCacheModule = void 0;
var redis_cache_service_1 = require("@/providers/cache/redis/redis-cache.service");
var common_1 = require("@nestjs/common");
var RedisCacheModule = /** @class */ (function () {
    function RedisCacheModule() {
    }
    RedisCacheModule = __decorate([
        (0, common_1.Global)(),
        (0, common_1.Module)({
            providers: [redis_cache_service_1.RedisCacheService],
            exports: [redis_cache_service_1.RedisCacheService],
        })
    ], RedisCacheModule);
    return RedisCacheModule;
}());
exports.RedisCacheModule = RedisCacheModule;
