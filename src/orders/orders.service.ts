import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { OrderItem } from 'src/order-item/entities/order-item.entity'
import { Product } from 'src/products/entities/product.entity'
import { User } from 'src/users/entities/user.entity'
import { DataSource, Repository } from 'typeorm'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { Order } from './entities/order.entity'

@Injectable()
export class OrdersService {
	constructor(
		@InjectRepository(Order)
		private readonly orderRepo: Repository<Order>,
		@InjectRepository(OrderItem)
		private readonly orderItemRepo: Repository<OrderItem>,
		@InjectRepository(User)
		private readonly userRepo: Repository<User>,
		@InjectRepository(Product)
		private readonly productRepo: Repository<Product>,
		private readonly dataSource: DataSource
	) {}

	async create(createOrderDto: CreateOrderDto) {
		const user = await this.userRepo.findOne({
			where: { id: createOrderDto.userId },
		})

		if (!user) {
			throw new NotFoundException('User not found')
		}

		const queryRunner = this.dataSource.createQueryRunner()
		await queryRunner.connect()
		await queryRunner.startTransaction()

		try {
			const order = this.orderRepo.create({ user })
			const savedOrder = await queryRunner.manager.save(order)

			const orderItems: OrderItem[] = []

			for (const itemDto of createOrderDto.orderItems) {
				const product = await this.productRepo.findOne({
					where: { id: itemDto.productId },
				})

				if (!product) {
					throw new NotFoundException(
						`Product with ID ${itemDto.productId} not found`
					)
				}

				const orderItem = this.orderItemRepo.create({
					order: savedOrder,
					product,
					quantity: itemDto.quantity,
				})

				orderItems.push(orderItem)
			}

			await queryRunner.manager.save(orderItems)
			await queryRunner.commitTransaction()

			return await this.orderRepo.findOne({
				where: { id: savedOrder.id },
				relations: ['user', 'orderItems', 'orderItems.product'],
			})
		} catch (error) {
			await queryRunner.rollbackTransaction()
			throw error
		} finally {
			await queryRunner.release()
		}
	}

	async findAll() {
		return await this.orderRepo.find({
			relations: ['user', 'orderItems', 'orderItems.product'],
		})
	}

	async findOne(id: number) {
		const order = await this.orderRepo.findOne({
			where: { id },
			relations: ['user', 'orderItems', 'orderItems.product'],
		})

		if (!order) {
			throw new NotFoundException('Order not found')
		}

		return order
	}

	async update(id: number, updateOrderDto: UpdateOrderDto) {
		const order = await this.orderRepo.findOne({
			where: { id },
			relations: ['orderItems'],
		})

		if (!order) {
			throw new NotFoundException('Order not found')
		}

		if (updateOrderDto.userId) {
			const user = await this.userRepo.findOne({
				where: { id: updateOrderDto.userId },
			})

			if (!user) {
				throw new NotFoundException('User not found')
			}

			order.user = user
		}

		if (updateOrderDto.orderItems) {
			await this.orderItemRepo.remove(order.orderItems)

			const orderItems: OrderItem[] = []

			for (const itemDto of updateOrderDto.orderItems) {
				const product = await this.productRepo.findOne({
					where: { id: itemDto.productId },
				})

				if (!product) {
					throw new NotFoundException(
						`Product with ID ${itemDto.productId} not found`
					)
				}

				const orderItem = this.orderItemRepo.create({
					order,
					product,
					quantity: itemDto.quantity,
				})

				orderItems.push(orderItem)
			}

			await this.orderItemRepo.save(orderItems)
		}

		return await this.orderRepo.findOne({
			where: { id },
			relations: ['user', 'orderItems', 'orderItems.product'],
		})
	}

	async remove(id: number) {
		const order = await this.orderRepo.findOne({
			where: { id },
			relations: ['orderItems'],
		})

		if (!order) {
			throw new NotFoundException('Order not found')
		}

		await this.orderRepo.remove(order)
		return {}
	}
}
