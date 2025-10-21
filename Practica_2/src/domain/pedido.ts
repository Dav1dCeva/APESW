import type { IClientes } from './cliente';
import type { IDetallePedidos } from './detalle_pedido';
import type { IFacturas } from './factura';

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