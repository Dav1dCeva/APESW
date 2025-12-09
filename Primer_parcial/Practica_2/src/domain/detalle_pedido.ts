import type { IProductos } from './producto';
import type { IPedidos } from './pedido';

export interface IDetallePedidos {
    id: number;
    cantidad_solicitada: number;
    precio_unitario: number;
    subtotal: number;
    productoId: number;
    pedidoId: number;
    productos: IProductos[];
    pedidos: IPedidos;
}