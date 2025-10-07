import type { IProductos } from '../../src/domain/producto';
import type { IPedidos } from '../../src/domain/pedido';
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
//# sourceMappingURL=detalle_pedido.d.ts.map