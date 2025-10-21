import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';
import { Pedido } from '../../pedidos/entities/pedido.entity';

@Entity('detalles_pedidos')
export class DetallePedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  cantidad_solicitada: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_unitario: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @ManyToOne(() => Producto, { nullable: false })
  @JoinColumn({ name: 'productoId' })
  producto: Producto;

  @Column()
  productoId: number;

  @ManyToOne(() => Pedido, pedido => pedido.detalles, { nullable: false })
  @JoinColumn({ name: 'pedidoId' })
  pedido: Pedido;

  @Column()
  pedidoId: number;
}
