import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Producto } from "./Producto";

@Entity()
export class DetallePedido {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  cantidad!: number;

  @Column()
  subtotal!: number;

  @ManyToOne(() => Producto, (producto) => producto.detallesPedido)
  producto!: Producto;
}
