import type { IDetallePedidos } from '../domain/detalle_pedido';
import { createDetalleCallback, updateDetallePromise, getAllDetalles, getDetalleById, deleteDetalle } from '../service/detalle_pedido.service';

export type DetalleRecord = IDetallePedidos & { deleted?: boolean | undefined };

export function createDetalleUseCase(data: Partial<IDetallePedidos>): Promise<DetalleRecord> {
    return new Promise((resolve, reject) => {
        createDetalleCallback(data, (err, res) => {
            if (err) return reject(err);
            resolve(res as DetalleRecord);
        });
    });
}

export function updateDetalleUseCase(id: number, patch: Partial<IDetallePedidos>): Promise<DetalleRecord> {
    return updateDetallePromise(id, patch) as Promise<DetalleRecord>;
}

export async function getDetalleUseCase(id: number): Promise<DetalleRecord> {
    return getDetalleById(id) as Promise<DetalleRecord>;
}

export async function listDetallesUseCase(includeDeleted = false): Promise<DetalleRecord[]> {
    return getAllDetalles(includeDeleted) as Promise<DetalleRecord[]>;
}

export async function deleteDetalleUseCase(id: number, options?: { physical?: boolean }): Promise<boolean> {
    return deleteDetalle(id, options);
}
