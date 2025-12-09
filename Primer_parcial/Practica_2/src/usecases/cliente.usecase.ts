import type { IClientes } from '../domain/cliente';
import { createClienteCallback, updateClientePromise, getAllClientes, getClienteById, deleteCliente } from '../service/cliente.service';

export type ClienteRecord = IClientes & { deleted?: boolean | undefined };

/**
 * Crea un cliente usando el servicio con callback, pero expone una Promise (más fácil en usecases).
 */
export function createClienteUseCase(data: Partial<IClientes>): Promise<ClienteRecord> {
    return new Promise((resolve, reject) => {
        createClienteCallback(data, (err, res) => {
            if (err) return reject(err);
            // res puede ser ClientRecord con deleted; castear
            resolve(res as ClienteRecord);
        });
    });
}

export function updateClienteUseCase(id: number, patch: Partial<IClientes>): Promise<ClienteRecord> {
    return updateClientePromise(id, patch) as Promise<ClienteRecord>;
}

export async function getClienteUseCase(id: number): Promise<ClienteRecord> {
    return getClienteById(id) as Promise<ClienteRecord>;
}

export async function listClientesUseCase(includeDeleted = false): Promise<ClienteRecord[]> {
    return getAllClientes(includeDeleted) as Promise<ClienteRecord[]>;
}

export async function deleteClienteUseCase(id: number, options?: { physical?: boolean }): Promise<boolean> {
    return deleteCliente(id, options);
}
