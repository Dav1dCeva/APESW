import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Pedido } from '../../pedidos/entities/pedido.entity';

@Entity({ name: 'facturas' })
export class Factura {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'date' })
	fecha: string;

	@Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
	subtotal: number;

	@Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
	iva: number;

	@Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
	total: number;

	@ManyToOne(() => Cliente, { nullable: false })
	@JoinColumn({ name: 'clienteId' })
	cliente: Cliente;

	@Column()
	clienteId: number;

	@OneToOne(() => Pedido, pedido => pedido.factura)
	@JoinColumn({ name: 'pedidoId' })
	pedido: Pedido;

	@Column({ nullable: true })
	pedidoId?: number;
}
