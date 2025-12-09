import type { IDetallePedidos } from './detalle_pedido';

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