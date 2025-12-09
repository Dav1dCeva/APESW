import type { IProductos } from '../domain/producto';
import { createProductoCallback, updateProductoPromise, getAllProductos, getProductoById, deleteProducto } from '../service/producto.service';

export type ProductRecord = IProductos & { deleted?: boolean | undefined };

export function createProductoUseCase(data: Partial<IProductos>): Promise<ProductRecord> {
    return new Promise((resolve, reject) => {
        createProductoCallback(data, (err, res) => {
            if (err) return reject(err);
            resolve(res as ProductRecord);
        });
    });
}

export function updateProductoUseCase(id: number, patch: Partial<IProductos>): Promise<ProductRecord> {
    return updateProductoPromise(id, patch) as Promise<ProductRecord>;
}

export async function getProductoUseCase(id: number): Promise<ProductRecord> {
    return getProductoById(id) as Promise<ProductRecord>;
}

export async function listProductosUseCase(includeDeleted = false): Promise<ProductRecord[]> {
    return getAllProductos(includeDeleted) as Promise<ProductRecord[]>;
}

export async function deleteProductoUseCase(id: number, options?: { physical?: boolean }): Promise<boolean> {
    return deleteProducto(id, options);
}
