import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { OrdenProduccion } from '../../ordenes-produccion/entities/ordenes-produccion.entity';
import { Insumo } from '../../insumos/entities/insumo.entity';

@Entity({ name: 'detalles_orden_produccion' })
export class DetalleOrdenProduccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cantidad_utilizada: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  costo_unitario: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @ManyToOne(() => OrdenProduccion, orden => orden.detalles, { nullable: false })
  @JoinColumn({ name: 'ordenProduccionId' })
  ordenProduccion: OrdenProduccion;

  @Column()
  ordenProduccionId: number;

  @ManyToOne(() => Insumo, insumo => insumo.detallesOrden, { nullable: false })
  @JoinColumn({ name: 'insumoId' })
  insumo: Insumo;

  @Column()
  insumoId: number;
}
