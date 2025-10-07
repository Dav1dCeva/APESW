import type { IFacturas } from '../domain/factura';
type FacturaRecord = IFacturas & {
    deleted?: boolean | undefined;
};
export declare function createFacturaCallback(newF: Partial<IFacturas>, cb: (err: Error | null, res?: FacturaRecord | null) => void): void;
export declare function updateFacturaPromise(id: number, patch: Partial<IFacturas>): Promise<FacturaRecord>;
export declare function getFacturaById(id: number): Promise<FacturaRecord>;
export declare function getAllFacturas(includeDeleted?: boolean): Promise<FacturaRecord[]>;
export declare function deleteFactura(id: number, options?: {
    physical?: boolean;
}): Promise<boolean>;
export declare function _clearFacturasForTest(): void;
export {};
//# sourceMappingURL=factura.service.d.ts.map