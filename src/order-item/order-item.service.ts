import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Order } from 'src/orders/entities/order.entity'
import { Product } from 'src/products/entities/product.entity'
import { Repository } from 'typeorm'
import { CreateOrderItemDto } from './dto/create-order-item.dto'
import { UpdateOrderItemDto } from './dto/update-order-item.dto'
import { OrderItem } from './entities/order-item.entity'

@Injectable()
export class OrderItemService {
	constructor(
		@InjectRepository(OrderItem)
		private readonly orderItemRepo: Repository<OrderItem>,
		@InjectRepository(Order)
		private readonly orderRepo: Repository<Order>,
		@InjectRepository(Product)
		private readonly productRepo: Repository<Product>
	) {}

	async create(createOrderItemDto: CreateOrderItemDto) {
		const order = await this.orderRepo.findOne({
			where: { id: createOrderItemDto.orderId },
		})

		if (!order) {
			throw new NotFoundException('Order not found')
		}

		const product = await this.productRepo.findOne({
			where: { id: createOrderItemDto.productId },
		})

		if (!product) {
			throw new NotFoundException('Product not found')
		}

		const orderItem = this.orderItemRepo.create({
			order,
			product,
			quantity: createOrderItemDto.quantity,
		})

		return await this.orderItemRepo.save(orderItem)
	}

	async findAll() {
		return await this.orderItemRepo.find({
			relations: ['order', 'product'],
		})
	}

	async findOne(id: number) {
		const orderItem = await this.orderItemRepo.findOne({
			where: { id },
			relations: ['order', 'product'],
		})

		if (!orderItem) {
			throw new NotFoundException('Order item not found')
		}

		return orderItem
	}

	async update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
		const orderItem = await this.orderItemRepo.findOne({
			where: { id },
			relations: ['order', 'product'],
		})

		if (!orderItem) {
			throw new NotFoundException('Order item not found')
		}

		if (updateOrderItemDto.orderId) {
			const order = await this.orderRepo.findOne({
				where: { id: updateOrderItemDto.orderId },
			})

			if (!order) {
				throw new NotFoundException('Order not found')
			}

			orderItem.order = order
		}

		if (updateOrderItemDto.productId) {
			const product = await this.productRepo.findOne({
				where: { id: updateOrderItemDto.productId },
			})

			if (!product) {
				throw new NotFoundException('Product not found')
			}

			orderItem.product = product
		}

		if (updateOrderItemDto.quantity) {
			orderItem.quantity = updateOrderItemDto.quantity
		}

		await this.orderItemRepo.save(orderItem)

		return await this.orderItemRepo.findOne({
			where: { id },
			relations: ['order', 'product'],
		})
	}

	async remove(id: number) {
		const orderItem = await this.orderItemRepo.findOne({ where: { id } })

		if (!orderItem) {
			throw new NotFoundException('Order item not found')
		}

		await this.orderItemRepo.remove(orderItem)
		return {}
	}
}
