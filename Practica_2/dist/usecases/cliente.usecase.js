"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClienteUseCase = createClienteUseCase;
exports.updateClienteUseCase = updateClienteUseCase;
exports.getClienteUseCase = getClienteUseCase;
exports.listClientesUseCase = listClientesUseCase;
exports.deleteClienteUseCase = deleteClienteUseCase;
const cliente_service_1 = require("../service/cliente.service");
/**
 * Crea un cliente usando el servicio con callback, pero expone una Promise (más fácil en usecases).
 */
function createClienteUseCase(data) {
    return new Promise((resolve, reject) => {
        (0, cliente_service_1.createClienteCallback)(data, (err, res) => {
            if (err)
                return reject(err);
            // res puede ser ClientRecord con deleted; castear
            resolve(res);
        });
    });
}
function updateClienteUseCase(id, patch) {
    return (0, cliente_service_1.updateClientePromise)(id, patch);
}
async function getClienteUseCase(id) {
    return (0, cliente_service_1.getClienteById)(id);
}
async function listClientesUseCase(includeDeleted = false) {
    return (0, cliente_service_1.getAllClientes)(includeDeleted);
}
async function deleteClienteUseCase(id, options) {
    return (0, cliente_service_1.deleteCliente)(id, options);
}
//# sourceMappingURL=cliente.usecase.js.map