import type { IPedidos } from '../domain/pedido';
import { createPedidoCallback, updatePedidoPromise, getAllPedidos, getPedidoById, deletePedido } from '../service/pedido.service';

export type PedidoRecord = IPedidos & { deleted?: boolean | undefined };

export function createPedidoUseCase(data: Partial<IPedidos>): Promise<PedidoRecord> {
    return new Promise((resolve, reject) => {
        createPedidoCallback(data, (err, res) => {
            if (err) return reject(err);
            resolve(res as PedidoRecord);
        });
    });
}

export function updatePedidoUseCase(id: number, patch: Partial<IPedidos>): Promise<PedidoRecord> {
    return updatePedidoPromise(id, patch) as Promise<PedidoRecord>;
}

export async function getPedidoUseCase(id: number): Promise<PedidoRecord> {
    return getPedidoById(id) as Promise<PedidoRecord>;
}

export async function listPedidosUseCase(includeDeleted = false): Promise<PedidoRecord[]> {
    return getAllPedidos(includeDeleted) as Promise<PedidoRecord[]>;
}

export async function deletePedidoUseCase(id: number, options?: { physical?: boolean }): Promise<boolean> {
    return deletePedido(id, options);
}
