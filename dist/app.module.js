"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const category_entity_1 = require("./category/entities/category.entity");
const product_entity_1 = require("./product/entities/product.entity");
const sale_entity_1 = require("./sale/entities/sale.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'rood',
                database: 'shopdb',
                autoLoadModels: true,
                synchronize: true,
                models: [product_entity_1.Product, sale_entity_1.Sale, category_entity_1.Category],
            }),
            sequelize_1.SequelizeModule.forFeature([product_entity_1.Product, sale_entity_1.Sale, category_entity_1.Category]),
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map