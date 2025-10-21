import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';
import { Insumo } from '../../insumos/entities/insumo.entity';

@Entity({ name: 'productos_insumos' })
export class ProductoInsumo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    cantidad_necesaria: number;

    @ManyToOne(() => Producto, producto => producto.productosInsumos, { nullable: false })
    @JoinColumn({ name: 'productoId' })
    producto: Producto;

    @Column()
    productoId: number;

    @ManyToOne(() => Insumo, insumo => insumo.productosInsumos, { nullable: false })
    @JoinColumn({ name: 'insumoId' })
    insumo: Insumo;

    @Column()
    insumoId: number;
}