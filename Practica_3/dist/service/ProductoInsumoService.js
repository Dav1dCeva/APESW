"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoInsumoService = void 0;
const datasource_1 = require("../datasource");
const ProductoInsumo_1 = require("../entidades/ProductoInsumo");
class ProductoInsumoService {
    constructor() {
        this.repo = datasource_1.AppDataSource.getRepository(ProductoInsumo_1.ProductoInsumo);
    }
    async create(data) {
        const nuevo = this.repo.create(data);
        return await this.repo.save(nuevo);
    }
    async findAll() {
        return await this.repo.find({ relations: ["producto"] });
    }
    async findOne(id) {
        return await this.repo.findOne({
            where: { id },
            relations: ["producto"],
        });
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return await this.findOne(id);
    }
    async remove(id) {
        return await this.repo.delete(id);
    }
}
exports.ProductoInsumoService = ProductoInsumoService;
//# sourceMappingURL=ProductoInsumoService.js.map