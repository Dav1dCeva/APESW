import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DetallePedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productoId: number;

  @Column()
  cantidad_solicitada: number;

  @Column()
  precio_unitario: number;

  @Column()
  subtotal: number;

  @Column()
  pedidoId: number;
}
