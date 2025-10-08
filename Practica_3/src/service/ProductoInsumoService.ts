import { AppDataSource } from "../datasource";
import { ProductoInsumo } from "../entidades/ProductoInsumo";

export class ProductoInsumoService {
  private repo = AppDataSource.getRepository(ProductoInsumo);

  async create(data: Partial<ProductoInsumo>) {
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

  async update(id: number, data: Partial<ProductoInsumo>) {
    await this.repo.update(id, data);
    return await this.findOne(id);
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}
