import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Producto } from "./Producto";

@Entity()
export class ProductoInsumo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  insumo!: string;

  @Column()
  cantidad!: number;

  @ManyToOne(() => Producto, (producto) => producto.insumos)
  producto!: Producto;
}
