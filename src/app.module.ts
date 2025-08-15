import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategriesModule } from './categries/categries.module'
import { OrderItemModule } from './order-item/order-item.module'
import { OrdersModule } from './orders/orders.module'
import { ProductsModule } from './products/products.module'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: String(process.env.DB_HOST),
			port: Number(process.env.DB_PORT),
			username: String(process.env.DB_USER),
			password: String(process.env.DB_PASS),
			database: String(process.env.DB_NAME),
			autoLoadEntities: true,
			synchronize: true,
		}),
		UsersModule,
		CategriesModule,
		ProductsModule,
		OrdersModule,
		OrderItemModule,
	],
})
export class AppModule {}
