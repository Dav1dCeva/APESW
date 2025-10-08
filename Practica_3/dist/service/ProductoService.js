"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoService = void 0;
const datasource_1 = require("../datasource");
const Producto_1 = require("../entidades/Producto");
class ProductoService {
    constructor() {
        this.repo = datasource_1.AppDataSource.getRepository(Producto_1.Producto);
    }
    async create(data) {
        const nuevo = this.repo.create(data);
        return await this.repo.save(nuevo);
    }
    async findAll() {
        return await this.repo.find({ relations: ["insumos", "detallesPedido"] });
    }
    async findOne(id) {
        return await this.repo.findOne({
            where: { id },
            relations: ["insumos", "detallesPedido"],
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
exports.ProductoService = ProductoService;
//# sourceMappingURL=ProductoService.js.map