import type { IProductos } from '../domain/producto';
export type ProductRecord = IProductos & {
    deleted?: boolean | undefined;
};
export declare function createProductoUseCase(data: Partial<IProductos>): Promise<ProductRecord>;
export declare function updateProductoUseCase(id: number, patch: Partial<IProductos>): Promise<ProductRecord>;
export declare function getProductoUseCase(id: number): Promise<ProductRecord>;
export declare function listProductosUseCase(includeDeleted?: boolean): Promise<ProductRecord[]>;
export declare function deleteProductoUseCase(id: number, options?: {
    physical?: boolean;
}): Promise<boolean>;
//# sourceMappingURL=producto.usecase.d.ts.map