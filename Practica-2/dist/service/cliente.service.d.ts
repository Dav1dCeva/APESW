import type { IClientes } from '../domain/cliente';
type ClientRecord = IClientes & {
    deleted?: boolean | undefined;
};
/**
 * Inserta un cliente en la 'DB' simulada usando patrón callback (error, resultado)
 * Simula latencia de red.
 */
export declare function createClienteCallback(newClient: Partial<IClientes>, callback: (err: Error | null, resultado?: ClientRecord | null) => void): void;
/**
 * Actualiza parcialmente un cliente. Retorna Promise que resuelve con el cliente actualizado.
 * Rechaza si no existe.
 */
export declare function updateClientePromise(id: number, patch: Partial<IClientes>): Promise<ClientRecord>;
/**
 * Obtiene un cliente por id. Lanza error si no existe.
 */
export declare function getClienteById(id: number): Promise<ClientRecord>;
/**
 * Lista todos los clientes. Por defecto excluye eliminados lógicamente.
 */
export declare function getAllClientes(includeDeleted?: boolean): Promise<ClientRecord[]>;
/**
 * Elimina un cliente. Por defecto realiza eliminación lógica (deleted = true).
 * Si options.physical = true, elimina físicamente del arreglo.
 * Retorna true si la operación tuvo éxito, false si no se encontró.
 */
export declare function deleteCliente(id: number, options?: {
    physical?: boolean;
}): Promise<boolean>;
export declare function _clearClientesForTest(): void;
export {};
//# sourceMappingURL=cliente.service.d.ts.map