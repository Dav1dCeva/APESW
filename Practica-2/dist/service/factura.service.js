"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFacturaCallback = createFacturaCallback;
exports.updateFacturaPromise = updateFacturaPromise;
exports.getFacturaById = getFacturaById;
exports.getAllFacturas = getAllFacturas;
exports.deleteFactura = deleteFactura;
exports._clearFacturasForTest = _clearFacturasForTest;
const facturas = [];
let nextFacturaId = 1;
function validateFactura(d) {
    if (!d)
        return 'Datos factura vacíos';
    if (!d.fecha_emision || !(d.fecha_emision instanceof Date))
        return 'Fecha emisión inválida';
    if (typeof d.total !== 'number' || d.total < 0)
        return 'Total inválido';
    return null;
}
function createFacturaCallback(newF, cb) {
    setTimeout(() => {
        const errMsg = validateFactura(newF);
        if (errMsg) {
            cb(new Error(errMsg));
            return;
        }
        const created = {
            id: nextFacturaId++,
            fecha_emision: newF.fecha_emision ?? new Date(),
            total: newF.total ?? 0,
            estado_pago: newF.estado_pago ?? 'pendiente',
            pedidos: newF.pedidos,
            clientes: newF.clientes,
        };
        facturas.push(created);
        cb(null, created);
    }, 80);
}
function updateFacturaPromise(id, patch) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const idx = facturas.findIndex(f => f.id === id && !f.deleted);
            if (idx === -1)
                return reject(new Error(`Factura id=${id} no encontrada`));
            const existing = facturasNonNull(idx);
            const updated = {
                id: existing.id,
                fecha_emision: patch.fecha_emision ?? existing.fecha_emision,
                total: patch.total ?? existing.total,
                estado_pago: patch.estado_pago ?? existing.estado_pago,
                pedidos: patch.pedidos ?? existing.pedidos,
                clientes: patch.clientes ?? existing.clientes,
                deleted: existing.deleted,
            };
            facturas[idx] = updated;
            resolve(updated);
        }, 90);
    });
}
async function getFacturaById(id) {
    await new Promise(r => setTimeout(r, 60));
    const f = facturas.find(x => x.id === id && !x.deleted);
    if (!f)
        throw new Error(`Factura id=${id} no encontrada`);
    return f;
}
async function getAllFacturas(includeDeleted = false) {
    await new Promise(r => setTimeout(r, 60));
    return facturas.filter(x => includeDeleted ? true : !x.deleted);
}
async function deleteFactura(id, options) {
    await new Promise(r => setTimeout(r, 60));
    const idx = facturas.findIndex(x => x.id === id && !x.deleted);
    if (idx === -1)
        return false;
    if (options?.physical) {
        facturas.splice(idx, 1);
        return true;
    }
    const rec = facturasNonNull(idx);
    rec.deleted = true;
    return true;
}
function _clearFacturasForTest() { facturas.length = 0; nextFacturaId = 1; }
function facturasNonNull(idx) {
    const r = facturas[idx];
    if (!r)
        throw new Error('Registro inconsistente facturas');
    return r;
}
//# sourceMappingURL=factura.service.js.map