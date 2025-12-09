import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrdenProduccion } from '../../ordenes-produccion/entities/ordenes-produccion.entity';
import { DetallePedido } from '../../detalles-pedidos/entities/detalles-pedido.entity';
import { ProductoInsumo } from '../../productos-insumos/entities/producto-insumo.entity';

@Entity({ name: 'productos' })
export class Producto {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 150 })
	nombre: string;

	@Column({ type: 'text', nullable: true })
	descripcion?: string;

	@Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
	precio: number;

	@Column({ default: true })
	disponible: boolean;

	@OneToMany(() => OrdenProduccion, (o) => o.producto)
	ordenesProduccion: OrdenProduccion[];

	@OneToMany(() => DetallePedido, detalle => detalle.producto)
	detallesPedidos: DetallePedido[];

	@OneToMany(() => ProductoInsumo, productoInsumo => productoInsumo.producto)
	productosInsumos: ProductoInsumo[];
}
