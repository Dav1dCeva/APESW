"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPedidoUseCase = createPedidoUseCase;
exports.updatePedidoUseCase = updatePedidoUseCase;
exports.getPedidoUseCase = getPedidoUseCase;
exports.listPedidosUseCase = listPedidosUseCase;
exports.deletePedidoUseCase = deletePedidoUseCase;
const pedido_service_1 = require("../service/pedido.service");
function createPedidoUseCase(data) {
    return new Promise((resolve, reject) => {
        (0, pedido_service_1.createPedidoCallback)(data, (err, res) => {
            if (err)
                return reject(err);
            resolve(res);
        });
    });
}
function updatePedidoUseCase(id, patch) {
    return (0, pedido_service_1.updatePedidoPromise)(id, patch);
}
async function getPedidoUseCase(id) {
    return (0, pedido_service_1.getPedidoById)(id);
}
async function listPedidosUseCase(includeDeleted = false) {
    return (0, pedido_service_1.getAllPedidos)(includeDeleted);
}
async function deletePedidoUseCase(id, options) {
    return (0, pedido_service_1.deletePedido)(id, options);
}
//# sourceMappingURL=pedido.usecase.js.map