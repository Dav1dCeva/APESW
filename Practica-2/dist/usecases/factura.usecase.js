"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFacturaUseCase = createFacturaUseCase;
exports.updateFacturaUseCase = updateFacturaUseCase;
exports.getFacturaUseCase = getFacturaUseCase;
exports.listFacturasUseCase = listFacturasUseCase;
exports.deleteFacturaUseCase = deleteFacturaUseCase;
const factura_service_1 = require("../service/factura.service");
function createFacturaUseCase(data) {
    return new Promise((resolve, reject) => {
        (0, factura_service_1.createFacturaCallback)(data, (err, res) => {
            if (err)
                return reject(err);
            resolve(res);
        });
    });
}
function updateFacturaUseCase(id, patch) {
    return (0, factura_service_1.updateFacturaPromise)(id, patch);
}
async function getFacturaUseCase(id) {
    return (0, factura_service_1.getFacturaById)(id);
}
async function listFacturasUseCase(includeDeleted = false) {
    return (0, factura_service_1.getAllFacturas)(includeDeleted);
}
async function deleteFacturaUseCase(id, options) {
    return (0, factura_service_1.deleteFactura)(id, options);
}
//# sourceMappingURL=factura.usecase.js.map