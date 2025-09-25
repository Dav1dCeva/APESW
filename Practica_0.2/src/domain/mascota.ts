import type cliente=require("./cliente");

export interface IMascota{
    id: number;
    nombre: string;
    tipo: string;
    cliente: cliente.ICliente;
}