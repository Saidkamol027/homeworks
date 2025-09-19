import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { Order } from './entities/order.entity'

@Injectable()
export class OrdersService {
	private orders: Order[] = [] 

	constructor(
		@Inject('RABBITMQ_SERVICE') private readonly rabbitClient: ClientProxy
	) {}

	async createOrder(orderData: {
		product: string
		quantity: number
	}): Promise<Order> {
		const order: Order = {
			id: Date.now(),
			...orderData,
			status: 'pending',
		}
		this.orders.push(order)

		this.rabbitClient.emit('order.created', order)
		return order
	}

	async getAllOrders(): Promise<Order[]> {
		return this.orders
	}

	async getOrderById(id: number): Promise<Order> {
		const order = this.orders.find(o => o.id === id)
		if (!order) throw new NotFoundException('Order not found')
		return order
	}

	async updateOrder(id: number, data: Partial<Order>): Promise<Order> {
		const order = await this.getOrderById(id)
		Object.assign(order, data)
		return order
	}

	async deleteOrder(id: number): Promise<Order> {
		const index = this.orders.findIndex(o => o.id === id)
		if (index === -1) throw new NotFoundException('Order not found')
		const [deleted] = this.orders.splice(index, 1)
		return deleted
	}

	async confirmOrder(id: number): Promise<Order> {
		const order = await this.getOrderById(id)
		order.status = 'confirmed'
		this.rabbitClient.emit('order.confirmed', order)
		return order
	}

	async cancelOrder(id: number): Promise<Order> {
		const order = await this.getOrderById(id)
		order.status = 'cancelled'
		this.rabbitClient.emit('order.cancelled', order)
		return order
	}
}
