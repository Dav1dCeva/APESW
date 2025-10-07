import type { IClientes } from '../../src/domain/cliente';
import type { IDetallePedidos } from '../../src/domain/detalle_pedido';
import type { IFacturas } from '../../src/domain/factura';
export interface IPedidos {
    id: number;
    fecha: Date;
    total: number;
    estado: string;
    clienteId: number;
    clientes: IClientes;
    detalles_pedido: IDetallePedidos[];
    factura: IFacturas | null;
}
//# sourceMappingURL=pedido.d.ts.map