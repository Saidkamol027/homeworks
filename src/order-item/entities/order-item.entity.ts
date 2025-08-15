import { Order } from 'src/orders/entities/order.entity'
import { Product } from 'src/products/entities/product.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'orderItem' })
export class OrderItem {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => Order, order => order.orderItems, { onDelete: 'CASCADE' })
	order: Order

	@ManyToOne(() => Product, product => product.OrderItem, {
		onDelete: 'CASCADE',
	})
	product: Product

	@Column()
	quantity: number
}
