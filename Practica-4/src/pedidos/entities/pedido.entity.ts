import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Factura } from '../../facturas/entities/factura.entity';
import { DetallePedido } from '../../detalles-pedidos/entities/detalles-pedido.entity';

@Entity({ name: 'pedidos' })
export class Pedido {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'text' })
	fecha: string;

	@Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
	total: number;

	@Column({ length: 50, default: 'pendiente' })
	estado: string;

	@ManyToOne(() => Cliente, (cliente) => cliente.pedidos, { nullable: false, onDelete: 'CASCADE' })
	@JoinColumn({ name: 'clienteId' })
	cliente: Cliente;

	@Column()
	clienteId: number;

	@OneToOne(() => Factura, factura => factura.pedido, { nullable: true })
	factura: Factura;

	@Column({ nullable: true })
	facturaId: number;

	@OneToMany(() => DetallePedido, detalle => detalle.pedido)
	detalles: DetallePedido[];
}
