import type * as pedido from './pedido';
import type * as factura from './factura';

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