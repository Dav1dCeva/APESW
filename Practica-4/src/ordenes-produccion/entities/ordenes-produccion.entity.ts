import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';
import { DetalleOrdenProduccion } from '../../detalles-orden-produccion/entities/detalles-orden-produccion.entity';

@Entity({ name: 'ordenes_produccion' })
export class OrdenProduccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha_inicio: string;

  @Column({ type: 'date', nullable: true })
  fecha_fin?: string;

  @Column({ length: 50, default: 'pendiente' })
  estado: string;

  @Column({ type: 'integer' })
  cantidad_producir: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  costo_total: number;

  @ManyToOne(() => Producto, producto => producto.ordenesProduccion, { nullable: false })
  @JoinColumn({ name: 'productoId' })
  producto: Producto;

  @Column()
  productoId: number;

  @OneToMany(() => DetalleOrdenProduccion, detalle => detalle.ordenProduccion)
  detalles: DetalleOrdenProduccion[];
}
