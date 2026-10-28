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
exports.RolesGuard = void 0;
var common_1 = require("@nestjs/common");
var core_1 = require("@nestjs/core");
var roles_decorator_1 = require("../decorators/roles.decorator");
var RolesGuard = /** @class */ (function () {
    function RolesGuard(reflector) {
        this.reflector = reflector;
    }
    RolesGuard.prototype.canActivate = function (context) {
        var requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        // If no roles are required → allow
        if (!requiredRoles)
            return true;
        var req = context.switchToHttp().getRequest();
        var user = req.user;
        // console.log("RolesGuard - User Roles:", user);
        if (!user)
            throw new common_1.ForbiddenException("User not authenticated");
        var hasRole = requiredRoles.some(function (role) { var _a; return (_a = user.roles) === null || _a === void 0 ? void 0 : _a.includes(role); });
        if (!hasRole) {
            throw new common_1.ForbiddenException("You do not have permission");
        }
        return true;
    };
    RolesGuard = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [core_1.Reflector])
    ], RolesGuard);
    return RolesGuard;
}());
exports.RolesGuard = RolesGuard;
