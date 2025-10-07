import type { IPedidos } from '../domain/pedido';

type PedidoRecord = IPedidos & { deleted?: boolean | undefined };

const pedidos: PedidoRecord[] = [];
let nextPedidoId = 1;

function validatePedidoData(data: Partial<IPedidos>): string | null {
    if (!data) return 'Datos de pedido vacíos';
    if (!data.fecha || !(data.fecha instanceof Date)) return 'Fecha inválida';
    if (typeof data.total !== 'number' || data.total < 0) return 'Total inválido';
    return null;
}

export function createPedidoCallback(newPedido: Partial<IPedidos>, cb: (err: Error | null, res?: PedidoRecord | null) => void): void {
    const latency = 80 + Math.floor(Math.random() * 200);
    setTimeout(() => {
        const errMsg = validatePedidoData(newPedido);
        if (errMsg) { cb(new Error(errMsg)); return; }
        const created: PedidoRecord = {
            id: nextPedidoId++,
            fecha: newPedido.fecha ?? new Date(),
            total: newPedido.total ?? 0,
            estado: newPedido.estado ?? 'pendiente',
            clienteId: newPedido.clienteId ?? 0,
            clientes: newPedido.clientes as any,
            detalles_pedido: newPedido.detalles_pedido || [],
            factura: newPedido.factura ?? null,
        };
        pedidos.push(created);
        cb(null, created);
    }, latency);
}

export function updatePedidoPromise(id: number, patch: Partial<IPedidos>): Promise<PedidoRecord> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const idx = pedidos.findIndex(p => p.id === id && !p.deleted);
            if (idx === -1) return reject(new Error(`Pedido id=${id} no encontrado`));
            const existing = pedidosNonNull(idx);
            const updated: PedidoRecord = {
                id: existing.id,
                fecha: patch.fecha ?? existing.fecha,
                total: patch.total ?? existing.total,
                estado: patch.estado ?? existing.estado,
                clienteId: patch.clienteId ?? existing.clienteId,
                clientes: patch.clientes ?? existing.clientes,
                detalles_pedido: patch.detalles_pedido ?? existing.detalles_pedido,
                factura: patch.factura ?? existing.factura,
                deleted: existing.deleted,
            };
            pedidos[idx] = updated;
            resolve(updated);
        }, 100);
    });
}

export async function getPedidoById(id: number): Promise<PedidoRecord> {
    await new Promise(r => setTimeout(r, 60));
    const found = pedidos.find(p => p.id === id && !p.deleted);
    if (!found) throw new Error(`Pedido id=${id} no encontrado`);
    return found;
}

export async function getAllPedidos(includeDeleted = false): Promise<PedidoRecord[]> {
    await new Promise(r => setTimeout(r, 60));
    return pedidos.filter(p => includeDeleted ? true : !p.deleted);
}

export async function deletePedido(id: number, options?: { physical?: boolean }): Promise<boolean> {
    await new Promise(r => setTimeout(r, 60));
    const idx = pedidos.findIndex(p => p.id === id && !p.deleted);
    if (idx === -1) return false;
    if (options?.physical) { pedidos.splice(idx, 1); return true; }
    const rec = pedidosNonNull(idx);
    rec.deleted = true;
    return true;
}

export function _clearPedidosForTest() { pedidos.length = 0; nextPedidoId = 1; }

function pedidosNonNull(idx: number): PedidoRecord {
    const r = pedidos[idx];
    if (!r) throw new Error('Registro inconsistente pedidos');
    return r;
}
