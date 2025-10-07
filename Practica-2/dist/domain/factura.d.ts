import type { IPedidos } from '../../src/domain/pedido';
import type { IClientes } from '../../src/domain/cliente';
export interface IFacturas {
    id: number;
    fecha_emision: Date;
    total: number;
    estado_pago: string;
    pedidos: IPedidos;
    clientes: IClientes;
}
//# sourceMappingURL=factura.d.ts.map