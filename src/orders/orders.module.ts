import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderItem } from 'src/order-item/entities/order-item.entity'
import { Product } from 'src/products/entities/product.entity'
import { User } from 'src/users/entities/user.entity'
import { Order } from './entities/order.entity'
import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'

@Module({
	imports: [TypeOrmModule.forFeature([Order, OrderItem, User, Product])],
	controllers: [OrdersController],
	providers: [OrdersService],
	exports: [TypeOrmModule],
})
export class OrdersModule {}
