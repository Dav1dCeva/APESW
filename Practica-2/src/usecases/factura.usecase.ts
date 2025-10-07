import type { IFacturas } from '../domain/factura';
import { createFacturaCallback, updateFacturaPromise, getAllFacturas, getFacturaById, deleteFactura } from '../service/factura.service';

export type FacturaRecord = IFacturas & { deleted?: boolean | undefined };

export function createFacturaUseCase(data: Partial<IFacturas>): Promise<FacturaRecord> {
    return new Promise((resolve, reject) => {
        createFacturaCallback(data, (err, res) => {
            if (err) return reject(err);
            resolve(res as FacturaRecord);
        });
    });
}

export function updateFacturaUseCase(id: number, patch: Partial<IFacturas>): Promise<FacturaRecord> {
    return updateFacturaPromise(id, patch) as Promise<FacturaRecord>;
}

export async function getFacturaUseCase(id: number): Promise<FacturaRecord> {
    return getFacturaById(id) as Promise<FacturaRecord>;
}

export async function listFacturasUseCase(includeDeleted = false): Promise<FacturaRecord[]> {
    return getAllFacturas(includeDeleted) as Promise<FacturaRecord[]>;
}

export async function deleteFacturaUseCase(id: number, options?: { physical?: boolean }): Promise<boolean> {
    return deleteFactura(id, options);
}
