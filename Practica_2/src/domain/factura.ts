import type { IPedidos } from './pedido';
import type { IClientes } from './cliente';

export interface IFacturas {
    id: number;
    fecha_emision: Date;
    total: number;
    estado_pago: string;
    pedidos: IPedidos;
    clientes: IClientes;
    
}