import type { IDetallePedidos } from '../domain/detalle_pedido';
type DetalleRecord = IDetallePedidos & {
    deleted?: boolean | undefined;
};
export declare function createDetalleCallback(newDet: Partial<IDetallePedidos>, cb: (err: Error | null, res?: DetalleRecord | null) => void): void;
export declare function updateDetallePromise(id: number, patch: Partial<IDetallePedidos>): Promise<DetalleRecord>;
export declare function getDetalleById(id: number): Promise<DetalleRecord>;
export declare function getAllDetalles(includeDeleted?: boolean): Promise<DetalleRecord[]>;
export declare function deleteDetalle(id: number, options?: {
    physical?: boolean;
}): Promise<boolean>;
export declare function _clearDetallesForTest(): void;
export {};
//# sourceMappingURL=detalle_pedido.service.d.ts.map