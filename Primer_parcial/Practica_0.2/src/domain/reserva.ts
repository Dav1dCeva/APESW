import type cliente=require("./cliente");
import type mascota=require("./mascota");
import type servicio=require("./servicio");

export interface IReserva{
    id: number;
    fecha: string;
    cliente: cliente.ICliente
    mascotas: mascota.IMascota;
    servicios: servicio.IServicio;
}