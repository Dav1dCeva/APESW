import { AppDataSource } from "../datasource";
import { DetallePedido } from "../entidades/DetallePedido";

export class DetallePedidoService {
  private repo = AppDataSource.getRepository(DetallePedido);

  async create(data: Partial<DetallePedido>) {
    const nuevo = this.repo.create(data);
    return await this.repo.save(nuevo);
  }

  async findAll() {
    return await this.repo.find({ relations: ["producto"] });
  }

  async findOne(id: number) {
    return await this.repo.findOne({
      where: { id },
      relations: ["producto"],
    });
  }

  async update(id: number, data: Partial<DetallePedido>) {
    await this.repo.update(id, data);
    return await this.findOne(id);
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}
