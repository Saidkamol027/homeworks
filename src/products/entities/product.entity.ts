import { Category } from 'src/categries/entities/categry.entity'
import { OrderItem } from 'src/order-item/entities/order-item.entity'
import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({ name: 'product' })
export class Product {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column('decimal', { precision: 10, scale: 20 })
	price: number

	@ManyToOne(() => Category, categories => categories.product)
	categories: Category

	@OneToMany(() => OrderItem, orderItem => orderItem.product)
	OrderItem: OrderItem[]
}
