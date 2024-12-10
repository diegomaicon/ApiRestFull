import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('products')
class Product {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  quantity: number;
  @Column()
  created_at: Date;
  @Column()
  updated_at: Date;
}

export default Product
