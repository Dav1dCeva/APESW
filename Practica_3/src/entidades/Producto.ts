import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ProductoInsumo } from "./ProductoInsumo";
import { DetallePedido } from "./DetallePedido";

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  categoria!: string;

  @Column()
  descripcion!: string;

  // Relaciones
  @OneToMany(() => ProductoInsumo, (pi) => pi.producto)
  insumos!: ProductoInsumo[];

  @OneToMany(() => DetallePedido, (dp) => dp.producto)
  detallesPedido!: DetallePedido[];
}
