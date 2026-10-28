import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number; 

  @Column()
  name!: string;

  @Column()
  category!: string;

  @Column('numeric', { precision: 10, scale: 2 })
  price!: number;

  @Column('integer')
  quantity!: number;
}