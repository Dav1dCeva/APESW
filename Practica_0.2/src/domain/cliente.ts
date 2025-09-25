import type mascota=require("./mascota");

export interface ICliente{
    id: number;
    nombre: string;
    email: string;
    mascotas: mascota.IMascota[];
}