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
exports.CategoryResolver = void 0;
const category_entity_1 = require("./entities/category.entity");
const graphql_1 = require("@nestjs/graphql");
const category_service_1 = require("./category.service");
const create_category_input_1 = require("./dto/create-category.input");
const update_category_input_1 = require("./dto/update-category.input");
let CategoryResolver = class CategoryResolver {
    categoryService;
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    categories() {
        return this.categoryService.findAll();
    }
    category(id) {
        return this.categoryService.findOne(id);
    }
    createCategory(data) {
        return this.categoryService.create(data);
    }
    updateCategory(data) {
        return this.categoryService.update(data);
    }
    removeCategory(id) {
        return this.categoryService.remove(id);
    }
};
exports.CategoryResolver = CategoryResolver;
__decorate([
    (0, graphql_1.Query)(() => [category_entity_1.Category]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoryResolver.prototype, "categories", null);
__decorate([
    (0, graphql_1.Query)(() => category_entity_1.Category),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CategoryResolver.prototype, "category", null);
__decorate([
    (0, graphql_1.Mutation)(() => category_entity_1.Category),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_input_1.CreateCategoryInput]),
    __metadata("design:returntype", void 0)
], CategoryResolver.prototype, "createCategory", null);
__decorate([
    (0, graphql_1.Mutation)(() => category_entity_1.Category),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_category_input_1.UpdateCategoryInput]),
    __metadata("design:returntype", void 0)
], CategoryResolver.prototype, "updateCategory", null);
__decorate([
    (0, graphql_1.Mutation)(() => category_entity_1.Category),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CategoryResolver.prototype, "removeCategory", null);
exports.CategoryResolver = CategoryResolver = __decorate([
    (0, graphql_1.Resolver)(() => category_entity_1.Category),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryResolver);
//# sourceMappingURL=category.resolver.js.map