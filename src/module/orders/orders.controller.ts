import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { Order } from './entities/order.entity'
import { OrdersService } from './orders.service'

@Controller('orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Post()
	create(@Body() body: { product: string; quantity: number }): Promise<Order> {
		return this.ordersService.createOrder(body)
	}

	@Get()
	findAll(): Promise<Order[]> {
		return this.ordersService.getAllOrders()
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<Order> {
		return this.ordersService.getOrderById(+id)
	}

	@Put(':id')
	update(
		@Param('id') id: string,
		@Body() body: Partial<Order>
	): Promise<Order> {
		return this.ordersService.updateOrder(+id, body)
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<Order> {
		return this.ordersService.deleteOrder(+id)
	}

	@Post(':id/confirm')
	confirm(@Param('id') id: string): Promise<Order> {
		return this.ordersService.confirmOrder(+id)
	}

	@Post(':id/cancel')
	cancel(@Param('id') id: string): Promise<Order> {
		return this.ordersService.cancelOrder(+id)
	}
}
