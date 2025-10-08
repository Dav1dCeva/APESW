"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetallePedidoService = void 0;
const datasource_1 = require("../datasource");
const DetallePedido_1 = require("../entidades/DetallePedido");
class DetallePedidoService {
    constructor() {
        this.repo = datasource_1.AppDataSource.getRepository(DetallePedido_1.DetallePedido);
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
exports.DetallePedidoService = DetallePedidoService;
//# sourceMappingURL=DetallePedidoService.js.map