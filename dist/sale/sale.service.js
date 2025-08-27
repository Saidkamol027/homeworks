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
exports.SaleService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sale_entity_1 = require("./entities/sale.entity");
let SaleService = class SaleService {
    saleModel;
    constructor(saleModel) {
        this.saleModel = saleModel;
    }
    create(data) {
        return this.saleModel.create(data);
    }
    findAll() {
        return this.saleModel.findAll();
    }
    async update(id, data) {
        const sale = await this.saleModel.findByPk(id);
        if (!sale)
            throw new Error('Sale not found');
        return sale.update(data);
    }
    async remove(id) {
        const sale = await this.saleModel.findByPk(id);
        if (!sale)
            throw new Error('Sale not found');
        await sale.destroy();
        return true;
    }
};
exports.SaleService = SaleService;
exports.SaleService = SaleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(sale_entity_1.Sale)),
    __metadata("design:paramtypes", [Object])
], SaleService);
//# sourceMappingURL=sale.service.js.map