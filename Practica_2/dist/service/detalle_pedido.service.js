"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDetalleCallback = createDetalleCallback;
exports.updateDetallePromise = updateDetallePromise;
exports.getDetalleById = getDetalleById;
exports.getAllDetalles = getAllDetalles;
exports.deleteDetalle = deleteDetalle;
exports._clearDetallesForTest = _clearDetallesForTest;
const detalles = [];
let nextDetalleId = 1;
function validateDetalle(data) {
    if (!data)
        return 'Datos vacíos';
    if (typeof data.cantidad_solicitada !== 'number' || data.cantidad_solicitada <= 0)
        return 'Cantidad inválida';
    if (typeof data.precio_unitario !== 'number' || data.precio_unitario < 0)
        return 'Precio unitario inválido';
    if (typeof data.productoId !== 'number' || data.productoId <= 0)
        return 'productoId inválido';
    return null;
}
function createDetalleCallback(newDet, cb) {
    setTimeout(() => {
        const errMsg = validateDetalle(newDet);
        if (errMsg) {
            cb(new Error(errMsg));
            return;
        }
        const created = {
            id: nextDetalleId++,
            cantidad_solicitada: newDet.cantidad_solicitada,
            precio_unitario: newDet.precio_unitario,
            subtotal: newDet.cantidad_solicitada * newDet.precio_unitario,
            productoId: newDet.productoId,
            pedidoId: newDet.pedidoId ?? 0,
            productos: newDet.productos || [],
            pedidos: newDet.pedidos,
        };
        detalles.push(created);
        cb(null, created);
    }, 70);
}
function updateDetallePromise(id, patch) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const idx = detalles.findIndex(d => d.id === id && !d.deleted);
            if (idx === -1)
                return reject(new Error(`Detalle id=${id} no encontrado`));
            const existing = detallesNonNull(idx);
            const updated = {
                id: existing.id,
                cantidad_solicitada: patch.cantidad_solicitada ?? existing.cantidad_solicitada,
                precio_unitario: patch.precio_unitario ?? existing.precio_unitario,
                subtotal: (patch.cantidad_solicitada ?? existing.cantidad_solicitada) * (patch.precio_unitario ?? existing.precio_unitario),
                productoId: patch.productoId ?? existing.productoId,
                pedidoId: patch.pedidoId ?? existing.pedidoId,
                productos: patch.productos ?? existing.productos,
                pedidos: patch.pedidos ?? existing.pedidos,
                deleted: existing.deleted,
            };
            detalles[idx] = updated;
            resolve(updated);
        }, 90);
    });
}
async function getDetalleById(id) {
    await new Promise(r => setTimeout(r, 50));
    const f = detalles.find(d => d.id === id && !d.deleted);
    if (!f)
        throw new Error(`Detalle id=${id} no encontrado`);
    return f;
}
async function getAllDetalles(includeDeleted = false) {
    await new Promise(r => setTimeout(r, 50));
    return detalles.filter(d => includeDeleted ? true : !d.deleted);
}
async function deleteDetalle(id, options) {
    await new Promise(r => setTimeout(r, 50));
    const idx = detalles.findIndex(d => d.id === id && !d.deleted);
    if (idx === -1)
        return false;
    if (options?.physical) {
        detalles.splice(idx, 1);
        return true;
    }
    const rec = detallesNonNull(idx);
    rec.deleted = true;
    return true;
}
function _clearDetallesForTest() { detalles.length = 0; nextDetalleId = 1; }
function detallesNonNull(idx) {
    const r = detalles[idx];
    if (!r)
        throw new Error('Registro inconsistente detalles');
    return r;
}
//# sourceMappingURL=detalle_pedido.service.js.map