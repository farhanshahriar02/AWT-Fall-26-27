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
exports.QueryParserPipe = void 0;
var common_1 = require("@nestjs/common");
var requestParser_1 = require("@/common/helpers/requestParser");
var QueryParserPipe = /** @class */ (function () {
    function QueryParserPipe(findType, searchFields) {
        if (searchFields === void 0) { searchFields = []; }
        this.findType = findType;
        this.searchFields = searchFields;
    }
    QueryParserPipe.prototype.transform = function (value, metadata) {
        var type = metadata.type;
        // Make sure to only run your logic on queries
        if (type === "query")
            return this.transformQuery(value);
        return value;
    };
    QueryParserPipe.prototype.transformQuery = function (query) {
        if (typeof query !== "object" || !query)
            return query;
        try {
            if (this.findType == "MANY") {
                query = (0, requestParser_1.makeFindOption)(query, this.searchFields);
            }
            else {
                query = (0, requestParser_1.makeFindOneOption)(query);
            }
        }
        catch (err) {
            throw new common_1.BadRequestException("Bad Query String");
        }
        return query;
    };
    QueryParserPipe = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [String, Array])
    ], QueryParserPipe);
    return QueryParserPipe;
}());
exports.QueryParserPipe = QueryParserPipe;
