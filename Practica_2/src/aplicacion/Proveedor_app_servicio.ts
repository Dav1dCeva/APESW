import { Proveedor } from "../domain/Proveedor";
import { ProveedorService } from "./Proveedor_servicio";

export class ProveedorAppService {
  private service: ProveedorService;

  constructor() {
    this.service = new ProveedorService();
  }

  crearProveedor(data: Omit<Proveedor, "id_proveedor">, callback: (err: Error | null, result?: Proveedor) => void) {
    if (!data.nombre || data.nombre.length < 3) {
      callback(new Error("El nombre del proveedor debe tener al menos 3 caracteres"));
      return;
    }
    if (!data.telefono.match(/^\d{9}$/)) {
      callback(new Error("El teléfono debe tener 9 dígitos"));
      return;
    }
    this.service.createProveedor(data, callback);
  }

  async listarProveedores() {
    return await this.service.getAll();
  }

  async buscarProveedor(id: string) {
    const proveedor = await this.service.getById(id);
    if (!proveedor) {
      throw new Error("Proveedor no encontrado");
    }
    return proveedor;
  }

  actualizarProveedor(id: string, data: Partial<Proveedor>) {
    return this.service.updateProveedor(id, data);
  }

  async eliminarProveedor(id: string) {
    const ok = await this.service.deleteProveedor(id);
    if (!ok) throw new Error("Proveedor no encontrado para eliminar");
    return ok;
  }
}
