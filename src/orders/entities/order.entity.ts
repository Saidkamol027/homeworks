import { OrderItem } from 'src/order-item/entities/order-item.entity'
import { User } from 'src/users/entities/user.entity'
import {
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({ name: 'orders' })
export class Order {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => User, user => user.orders)
	user: User

	@OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
	orderItems: OrderItem[]

	@CreateDateColumn()
	createdAt: Date
}
