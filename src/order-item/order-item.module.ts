import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from 'src/orders/entities/order.entity'
import { Product } from 'src/products/entities/product.entity'
import { OrderItem } from './entities/order-item.entity'
import { OrderItemController } from './order-item.controller'
import { OrderItemService } from './order-item.service'

@Module({
	imports: [TypeOrmModule.forFeature([OrderItem, Order, Product])],
	controllers: [OrderItemController],
	providers: [OrderItemService],
	exports: [TypeOrmModule],
})
export class OrderItemModule {}
