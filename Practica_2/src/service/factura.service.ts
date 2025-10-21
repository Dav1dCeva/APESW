import type { IFacturas } from '../domain/factura';

type FacturaRecord = IFacturas & { deleted?: boolean | undefined };

const facturas: FacturaRecord[] = [];
let nextFacturaId = 1;

function validateFactura(d: Partial<IFacturas>): string | null {
    if (!d) return 'Datos factura vacíos';
    if (!d.fecha_emision || !(d.fecha_emision instanceof Date)) return 'Fecha emisión inválida';
    if (typeof d.total !== 'number' || d.total < 0) return 'Total inválido';
    return null;
}

export function createFacturaCallback(newF: Partial<IFacturas>, cb: (err: Error | null, res?: FacturaRecord | null) => void): void {
    setTimeout(() => {
        const errMsg = validateFactura(newF);
        if (errMsg) { cb(new Error(errMsg)); return; }
        const created: FacturaRecord = {
            id: nextFacturaId++,
            fecha_emision: newF.fecha_emision ?? new Date(),
            total: newF.total ?? 0,
            estado_pago: newF.estado_pago ?? 'pendiente',
            pedidos: newF.pedidos as any,
            clientes: newF.clientes as any,
        };
        facturas.push(created);
        cb(null, created);
    }, 80);
}

export function updateFacturaPromise(id: number, patch: Partial<IFacturas>): Promise<FacturaRecord> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const idx = facturas.findIndex(f => f.id === id && !f.deleted);
            if (idx === -1) return reject(new Error(`Factura id=${id} no encontrada`));
            const existing = facturasNonNull(idx);
            const updated: FacturaRecord = {
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

export async function getFacturaById(id: number): Promise<FacturaRecord> {
    await new Promise(r => setTimeout(r, 60));
    const f = facturas.find(x => x.id === id && !x.deleted);
    if (!f) throw new Error(`Factura id=${id} no encontrada`);
    return f;
}

export async function getAllFacturas(includeDeleted = false): Promise<FacturaRecord[]> {
    await new Promise(r => setTimeout(r, 60));
    return facturas.filter(x => includeDeleted ? true : !x.deleted);
}

export async function deleteFactura(id: number, options?: { physical?: boolean }): Promise<boolean> {
    await new Promise(r => setTimeout(r, 60));
    const idx = facturas.findIndex(x => x.id === id && !x.deleted);
    if (idx === -1) return false;
    if (options?.physical) { facturas.splice(idx, 1); return true; }
    const rec = facturasNonNull(idx);
    rec.deleted = true;
    return true;
}

export function _clearFacturasForTest() { facturas.length = 0; nextFacturaId = 1; }

function facturasNonNull(idx: number): FacturaRecord {
    const r = facturas[idx];
    if (!r) throw new Error('Registro inconsistente facturas');
    return r;
}
