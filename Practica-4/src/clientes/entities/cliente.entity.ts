import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pedido } from '../../pedidos/entities/pedido.entity';

@Entity({ name: 'clientes' })
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellido: string;

  @Column({ length: 20, unique: true })
  dni: string;

  @Column({ length: 30, nullable: true })
  telefono: string;

  @Column({ length: 150, nullable: true })
  email: string;

  @OneToMany(() => Pedido, (pedido) => pedido.cliente)
  pedidos: Pedido[];
}
