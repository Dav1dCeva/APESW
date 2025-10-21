"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDetalleUseCase = createDetalleUseCase;
exports.updateDetalleUseCase = updateDetalleUseCase;
exports.getDetalleUseCase = getDetalleUseCase;
exports.listDetallesUseCase = listDetallesUseCase;
exports.deleteDetalleUseCase = deleteDetalleUseCase;
const detalle_pedido_service_1 = require("../service/detalle_pedido.service");
function createDetalleUseCase(data) {
    return new Promise((resolve, reject) => {
        (0, detalle_pedido_service_1.createDetalleCallback)(data, (err, res) => {
            if (err)
                return reject(err);
            resolve(res);
        });
    });
}
function updateDetalleUseCase(id, patch) {
    return (0, detalle_pedido_service_1.updateDetallePromise)(id, patch);
}
async function getDetalleUseCase(id) {
    return (0, detalle_pedido_service_1.getDetalleById)(id);
}
async function listDetallesUseCase(includeDeleted = false) {
    return (0, detalle_pedido_service_1.getAllDetalles)(includeDeleted);
}
async function deleteDetalleUseCase(id, options) {
    return (0, detalle_pedido_service_1.deleteDetalle)(id, options);
}
//# sourceMappingURL=detalle_pedido.usecase.js.map