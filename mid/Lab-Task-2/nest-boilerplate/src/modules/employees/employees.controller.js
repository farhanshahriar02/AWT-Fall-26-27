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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesController = void 0;
var common_1 = require("@nestjs/common");
var employees_service_1 = require("./employees.service");
var create_employee_dto_1 = require("./dto/create-employee.dto");
var update_employee_dto_1 = require("./dto/update-employee.dto");
var EmployeesController = /** @class */ (function () {
    function EmployeesController(employeesService) {
        this.employeesService = employeesService;
    }
    EmployeesController.prototype.create = function (createEmployeeDto) {
        return this.employeesService.create(createEmployeeDto);
    };
    EmployeesController.prototype.findAll = function () {
        return this.employeesService.findAll();
    };
    EmployeesController.prototype.findOne = function (id) {
        return this.employeesService.findOne(+id);
    };
    EmployeesController.prototype.update = function (id, updateEmployeeDto) {
        return this.employeesService.update(+id, updateEmployeeDto);
    };
    EmployeesController.prototype.remove = function (id) {
        return this.employeesService.remove(+id);
    };
    __decorate([
        (0, common_1.Post)(),
        (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
        __param(0, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [create_employee_dto_1.CreateEmployeeDto]),
        __metadata("design:returntype", void 0)
    ], EmployeesController.prototype, "create", null);
    __decorate([
        (0, common_1.Get)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], EmployeesController.prototype, "findAll", null);
    __decorate([
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], EmployeesController.prototype, "findOne", null);
    __decorate([
        (0, common_1.Patch)(':id'),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, update_employee_dto_1.UpdateEmployeeDto]),
        __metadata("design:returntype", void 0)
    ], EmployeesController.prototype, "update", null);
    __decorate([
        (0, common_1.Delete)(':id'),
        (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
        __param(0, (0, common_1.Param)('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], EmployeesController.prototype, "remove", null);
    EmployeesController = __decorate([
        (0, common_1.Controller)('employees'),
        __metadata("design:paramtypes", [employees_service_1.EmployeesService])
    ], EmployeesController);
    return EmployeesController;
}());
exports.EmployeesController = EmployeesController;
