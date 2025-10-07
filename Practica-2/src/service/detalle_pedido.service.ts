import type { IDetallePedidos } from '../domain/detalle_pedido';

type DetalleRecord = IDetallePedidos & { deleted?: boolean | undefined };

const detalles: DetalleRecord[] = [];
let nextDetalleId = 1;

function validateDetalle(data: Partial<IDetallePedidos>): string | null {
    if (!data) return 'Datos vacíos';
    if (typeof data.cantidad_solicitada !== 'number' || data.cantidad_solicitada <= 0) return 'Cantidad inválida';
    if (typeof data.precio_unitario !== 'number' || data.precio_unitario < 0) return 'Precio unitario inválido';
    if (typeof data.productoId !== 'number' || data.productoId <= 0) return 'productoId inválido';
    return null;
}

export function createDetalleCallback(newDet: Partial<IDetallePedidos>, cb: (err: Error | null, res?: DetalleRecord | null) => void): void {
    setTimeout(() => {
        const errMsg = validateDetalle(newDet);
        if (errMsg) { cb(new Error(errMsg)); return; }
        const created: DetalleRecord = {
            id: nextDetalleId++,
            cantidad_solicitada: newDet.cantidad_solicitada as number,
            precio_unitario: newDet.precio_unitario as number,
            subtotal: (newDet.cantidad_solicitada as number) * (newDet.precio_unitario as number),
            productoId: newDet.productoId as number,
            pedidoId: newDet.pedidoId ?? 0,
            productos: newDet.productos || [],
            pedidos: newDet.pedidos as any,
        };
        detalles.push(created);
        cb(null, created);
    }, 70);
}

export function updateDetallePromise(id: number, patch: Partial<IDetallePedidos>): Promise<DetalleRecord> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const idx = detalles.findIndex(d => d.id === id && !d.deleted);
            if (idx === -1) return reject(new Error(`Detalle id=${id} no encontrado`));
            const existing = detallesNonNull(idx);
            const updated: DetalleRecord = {
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

export async function getDetalleById(id: number): Promise<DetalleRecord> {
    await new Promise(r => setTimeout(r, 50));
    const f = detalles.find(d => d.id === id && !d.deleted);
    if (!f) throw new Error(`Detalle id=${id} no encontrado`);
    return f;
}

export async function getAllDetalles(includeDeleted = false): Promise<DetalleRecord[]> {
    await new Promise(r => setTimeout(r, 50));
    return detalles.filter(d => includeDeleted ? true : !d.deleted);
}

export async function deleteDetalle(id: number, options?: { physical?: boolean }): Promise<boolean> {
    await new Promise(r => setTimeout(r, 50));
    const idx = detalles.findIndex(d => d.id === id && !d.deleted);
    if (idx === -1) return false;
    if (options?.physical) { detalles.splice(idx, 1); return true; }
    const rec = detallesNonNull(idx);
    rec.deleted = true;
    return true;
}

export function _clearDetallesForTest() { detalles.length = 0; nextDetalleId = 1; }

function detallesNonNull(idx: number): DetalleRecord {
    const r = detalles[idx];
    if (!r) throw new Error('Registro inconsistente detalles');
    return r;
}
