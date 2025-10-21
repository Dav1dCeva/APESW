import type { IPedidos } from '../domain/pedido';
export type PedidoRecord = IPedidos & {
    deleted?: boolean | undefined;
};
export declare function createPedidoUseCase(data: Partial<IPedidos>): Promise<PedidoRecord>;
export declare function updatePedidoUseCase(id: number, patch: Partial<IPedidos>): Promise<PedidoRecord>;
export declare function getPedidoUseCase(id: number): Promise<PedidoRecord>;
export declare function listPedidosUseCase(includeDeleted?: boolean): Promise<PedidoRecord[]>;
export declare function deletePedidoUseCase(id: number, options?: {
    physical?: boolean;
}): Promise<boolean>;
//# sourceMappingURL=pedido.usecase.d.ts.map