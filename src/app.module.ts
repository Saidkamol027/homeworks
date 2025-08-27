import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Category } from './category/entities/category.entity'
import { Product } from './product/entities/product.entity'
import { Sale } from './sale/entities/sale.entity'

@Module({
	imports: [
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'rood',
			database: 'shopdb',
			autoLoadModels: true,
			synchronize: true,
			models: [Product, Sale, Category],
		}),
		SequelizeModule.forFeature([Product, Sale, Category]),
	],
})
export class AppModule {}
