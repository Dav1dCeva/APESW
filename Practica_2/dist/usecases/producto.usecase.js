"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductoUseCase = createProductoUseCase;
exports.updateProductoUseCase = updateProductoUseCase;
exports.getProductoUseCase = getProductoUseCase;
exports.listProductosUseCase = listProductosUseCase;
exports.deleteProductoUseCase = deleteProductoUseCase;
const producto_service_1 = require("../service/producto.service");
function createProductoUseCase(data) {
    return new Promise((resolve, reject) => {
        (0, producto_service_1.createProductoCallback)(data, (err, res) => {
            if (err)
                return reject(err);
            resolve(res);
        });
    });
}
function updateProductoUseCase(id, patch) {
    return (0, producto_service_1.updateProductoPromise)(id, patch);
}
async function getProductoUseCase(id) {
    return (0, producto_service_1.getProductoById)(id);
}
async function listProductosUseCase(includeDeleted = false) {
    return (0, producto_service_1.getAllProductos)(includeDeleted);
}
async function deleteProductoUseCase(id, options) {
    return (0, producto_service_1.deleteProducto)(id, options);
}
//# sourceMappingURL=producto.usecase.js.map