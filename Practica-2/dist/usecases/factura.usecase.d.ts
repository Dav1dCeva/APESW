import type { IFacturas } from '../domain/factura';
export type FacturaRecord = IFacturas & {
    deleted?: boolean | undefined;
};
export declare function createFacturaUseCase(data: Partial<IFacturas>): Promise<FacturaRecord>;
export declare function updateFacturaUseCase(id: number, patch: Partial<IFacturas>): Promise<FacturaRecord>;
export declare function getFacturaUseCase(id: number): Promise<FacturaRecord>;
export declare function listFacturasUseCase(includeDeleted?: boolean): Promise<FacturaRecord[]>;
export declare function deleteFacturaUseCase(id: number, options?: {
    physical?: boolean;
}): Promise<boolean>;
//# sourceMappingURL=factura.usecase.d.ts.map