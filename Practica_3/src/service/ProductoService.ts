import { AppDataSource } from "../datasource";
import { Producto } from "../entidades/Producto";

export class ProductoService {
  private repo = AppDataSource.getRepository(Producto);

  async create(data: Partial<Producto>) {
    const nuevo = this.repo.create(data);
    return await this.repo.save(nuevo);
  }

  async findAll() {
    return await this.repo.find({ relations: ["insumos", "detallesPedido"] });
  }

  async findOne(id: number) {
    return await this.repo.findOne({
      where: { id },
      relations: ["insumos", "detallesPedido"],
    });
  }

  async update(id: number, data: Partial<Producto>) {
    await this.repo.update(id, data);
    return await this.findOne(id);
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}
