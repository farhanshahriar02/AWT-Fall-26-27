"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var typeorm_1 = require("@nestjs/typeorm");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var products_module_1 = require("./modules/products/products.module");
var employees_module_1 = require("./modules/employees/employees.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({ isGlobal: true }),
                typeorm_1.TypeOrmModule.forRootAsync({
                    imports: [config_1.ConfigModule],
                    inject: [config_1.ConfigService],
                    useFactory: function (configService) { return ({
                        type: 'postgres',
                        host: configService.get('DB_HOST'),
                        port: configService.get('DB_PORT'),
                        username: configService.get('DB_USERNAME'),
                        password: configService.get('DB_PASSWORD'),
                        database: configService.get('DB_NAME'),
                        entities: [__dirname + '/**/*.entity{.ts,.js}'],
                        synchronize: false, // pgAdmin এ টেবিল অলরেডি বানানো হয়েছে
                    }); },
                }),
                products_module_1.ProductsModule,
                employees_module_1.EmployeesModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
