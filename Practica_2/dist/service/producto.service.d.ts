import type { IProductos } from '../../src/domain/producto';
type ProductRecord = IProductos & {
    deleted?: boolean | undefined;
};
export declare function createProductoCallback(newProduct: Partial<IProductos>, cb: (err: Error | null, res?: ProductRecord | null) => void): void;
export declare function updateProductoPromise(id: number, patch: Partial<IProductos>): Promise<ProductRecord>;
export declare function getProductoById(id: number): Promise<ProductRecord>;
export declare function getAllProductos(includeDeleted?: boolean): Promise<ProductRecord[]>;
export declare function deleteProducto(id: number, options?: {
    physical?: boolean;
}): Promise<boolean>;
export declare function _clearProductosForTest(): void;
export {};
//# sourceMappingURL=producto.service.d.ts.map