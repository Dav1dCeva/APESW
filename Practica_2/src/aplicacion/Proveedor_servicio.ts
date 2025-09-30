import { Proveedor } from "../domain/Proveedor";
import { v4 as uuid } from "uuid";

export class ProveedorService {
  private proveedores: Proveedor[] = [];

  constructor() {

    this.proveedores = [
      { id_proveedor: uuid(), nombre: "Proveedor A", telefono: "099111111", producto_suministrado: "Platano" },
      { id_proveedor: uuid(), nombre: "Proveedor B", telefono: "099222222", producto_suministrado: "Aceite Vegetal" },
      { id_proveedor: uuid(), nombre: "Proveedor C", telefono: "099333333", producto_suministrado: "Sal" },
      { id_proveedor: uuid(), nombre: "Proveedor D", telefono: "099444444", producto_suministrado: "Conservantes" },
      { id_proveedor: uuid(), nombre: "Proveedor E", telefono: "099555555", producto_suministrado: "Bolsas" },
      { id_proveedor: uuid(), nombre: "Proveedor F", telefono: "099666666", producto_suministrado: "Etiquetas" },
      { id_proveedor: uuid(), nombre: "Proveedor G", telefono: "099777777", producto_suministrado: "Ajo" },
      { id_proveedor: uuid(), nombre: "Proveedor H", telefono: "099888888", producto_suministrado: "Chile" },
      { id_proveedor: uuid(), nombre: "Proveedor I", telefono: "099999999", producto_suministrado: "Limon" },
      { id_proveedor: uuid(), nombre: "Proveedor J", telefono: "099000000", producto_suministrado: "Polvo de cebolla" },
    ];
  }

  createProveedor(data: Omit<Proveedor, "id_proveedor">, callback: (err: Error | null, result?: Proveedor) => void) {
    setTimeout(() => {
      if (!data.nombre || !data.telefono) {
        callback(new Error("Datos incompletos"));
      } else {
        const nuevo: Proveedor = { id_proveedor: uuid(), ...data };
        this.proveedores.push(nuevo);
        callback(null, nuevo);
      }
    }, 1000);
  }

  async getAll(): Promise<Proveedor[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.proveedores), 1000);
    });
  }

  async getById(id: string): Promise<Proveedor | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.proveedores.find(p => p.id_proveedor === id)), 1000);
    });
  }

  updateProveedor(id: string, data: Partial<Proveedor>): Promise<Proveedor> {
    return new Promise((resolve, reject) => {
      const proveedor = this.proveedores.find(p => p.id_proveedor === id);
      if (!proveedor) {
        reject(new Error("Proveedor no encontrado"));
      } else {
        Object.assign(proveedor, data);
        resolve(proveedor);
      }
    });
  }

  async deleteProveedor(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      const index = this.proveedores.findIndex(p => p.id_proveedor === id);
      if (index !== -1) {
        this.proveedores.splice(index, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }
}
