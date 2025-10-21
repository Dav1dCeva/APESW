import type * as pedido from '../../src/domain/pedido';
import type * as factura from '../../src/domain/factura';
export interface IClientes {
    id: number;
    nombre: string;
    apellido: string;
    dni: string;
    telefono: string;
    email: string;
    pedidos: pedido.IPedidos[];
    facturas: factura.IFacturas[];
}
//# sourceMappingURL=cliente.d.ts.map