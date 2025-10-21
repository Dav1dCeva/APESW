import type { IClientes } from '../../src/domain/cliente';
export type ClienteRecord = IClientes & {
    deleted?: boolean | undefined;
};
/**
 * Crea un cliente usando el servicio con callback, pero expone una Promise (más fácil en usecases).
 */
export declare function createClienteUseCase(data: Partial<IClientes>): Promise<ClienteRecord>;
export declare function updateClienteUseCase(id: number, patch: Partial<IClientes>): Promise<ClienteRecord>;
export declare function getClienteUseCase(id: number): Promise<ClienteRecord>;
export declare function listClientesUseCase(includeDeleted?: boolean): Promise<ClienteRecord[]>;
export declare function deleteClienteUseCase(id: number, options?: {
    physical?: boolean;
}): Promise<boolean>;
//# sourceMappingURL=cliente.usecase.d.ts.map