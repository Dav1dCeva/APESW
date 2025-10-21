import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DetalleOrdenProduccion } from '../../detalles-orden-produccion/entities/detalles-orden-produccion.entity';
import { ProductoInsumo } from '../../productos-insumos/entities/producto-insumo.entity';

@Entity({ name: 'insumos' })
export class Insumo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 20 })
  unidad_medida: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  stock: number;

  @Column({ length: 20, default: 'disponible' })
  estado: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  precio_unitario: number;

  @OneToMany(() => DetalleOrdenProduccion, detalle => detalle.insumo)
  detallesOrden: DetalleOrdenProduccion[];

  @OneToMany(() => ProductoInsumo, productoInsumo => productoInsumo.insumo)
  productosInsumos: ProductoInsumo[];
}
