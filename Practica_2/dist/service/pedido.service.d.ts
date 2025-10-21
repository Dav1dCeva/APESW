import type { IPedidos } from '../domain/pedido';
type PedidoRecord = IPedidos & {
    deleted?: boolean | undefined;
};
export declare function createPedidoCallback(newPedido: Partial<IPedidos>, cb: (err: Error | null, res?: PedidoRecord | null) => void): void;
export declare function updatePedidoPromise(id: number, patch: Partial<IPedidos>): Promise<PedidoRecord>;
export declare function getPedidoById(id: number): Promise<PedidoRecord>;
export declare function getAllPedidos(includeDeleted?: boolean): Promise<PedidoRecord[]>;
export declare function deletePedido(id: number, options?: {
    physical?: boolean;
}): Promise<boolean>;
export declare function _clearPedidosForTest(): void;
export {};
//# sourceMappingURL=pedido.service.d.ts.map