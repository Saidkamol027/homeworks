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
exports.Sale = void 0;
const product_entity_1 = require("./../../product/entities/product.entity");
const graphql_1 = require("@nestjs/graphql");
const sequelize_typescript_1 = require("sequelize-typescript");
let Sale = class Sale extends sequelize_typescript_1.Model {
    amount;
    productId;
    product;
};
exports.Sale = Sale;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], Sale.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.FLOAT, allowNull: false }),
    __metadata("design:type", Number)
], Sale.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, sequelize_typescript_1.ForeignKey)(() => product_entity_1.Product),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Sale.prototype, "productId", void 0);
__decorate([
    (0, graphql_1.Field)(() => product_entity_1.Product),
    (0, sequelize_typescript_1.BelongsTo)(() => product_entity_1.Product),
    __metadata("design:type", product_entity_1.Product)
], Sale.prototype, "product", void 0);
exports.Sale = Sale = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, sequelize_typescript_1.Table)({ tableName: 'sales' })
], Sale);
//# sourceMappingURL=sale.entity.js.map