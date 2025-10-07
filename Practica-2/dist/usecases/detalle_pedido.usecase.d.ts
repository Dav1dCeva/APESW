import type { IDetallePedidos } from '../domain/detalle_pedido';
export type DetalleRecord = IDetallePedidos & {
    deleted?: boolean | undefined;
};
export declare function createDetalleUseCase(data: Partial<IDetallePedidos>): Promise<DetalleRecord>;
export declare function updateDetalleUseCase(id: number, patch: Partial<IDetallePedidos>): Promise<DetalleRecord>;
export declare function getDetalleUseCase(id: number): Promise<DetalleRecord>;
export declare function listDetallesUseCase(includeDeleted?: boolean): Promise<DetalleRecord[]>;
export declare function deleteDetalleUseCase(id: number, options?: {
    physical?: boolean;
}): Promise<boolean>;
//# sourceMappingURL=detalle_pedido.usecase.d.ts.map