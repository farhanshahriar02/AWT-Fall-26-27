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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryCacheService = void 0;
var common_1 = require("@nestjs/common");
var InMemoryCacheService = /** @class */ (function () {
    function InMemoryCacheService() {
        this.cache = new Map();
    }
    /**
     * Retrieves the value associated with the specified key from the cache.
     * @param key - The key of the value to retrieve.
     * @returns The value associated with the specified key, or undefined if the key is not found in the cache.
     */
    InMemoryCacheService.prototype.get = function (key) {
        return this.cache.get(key);
    };
    /**
     * Sets a value in the cache with the given key.
     * @param key - The key to set the value with.
     * @param value - The value to set in the cache.
     */
    InMemoryCacheService.prototype.set = function (key, value) {
        this.cache.set(key, value);
    };
    /**
     * Deletes the value associated with the given key from the cache.
     * @param key - The key of the value to delete.
     */
    InMemoryCacheService.prototype.delete = function (key) {
        this.cache.delete(key);
    };
    /**
     * Clears all entries from the cache.
     */
    InMemoryCacheService.prototype.clear = function () {
        this.cache.clear();
    };
    /**
     * Executes the provided callback function only once for the given key.
     * Subsequent calls with the same key will not execute the callback again.
     * @param key - The key to check if the callback has already been executed for.
     * @param callback - The function to execute only once for the given key.
     */
    InMemoryCacheService.prototype.executeOnce = function (key, callback) {
        if (this.cache.has(key))
            return;
        callback();
        this.cache.set(key, 1);
    };
    InMemoryCacheService = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [])
    ], InMemoryCacheService);
    return InMemoryCacheService;
}());
exports.InMemoryCacheService = InMemoryCacheService;
