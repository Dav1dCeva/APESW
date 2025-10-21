import type { IDetallePedidos } from '../../src/domain/detalle_pedido';
export interface IProductos {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    categoria: string;
    precio_unitario: number;
    unidad_medida: string;
    estado: string;
    detalles_pedido: IDetallePedidos[];
}
//# sourceMappingURL=producto.d.ts.map