import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Product } from './entities/product.entity'
import { ProductResolver } from './product.resolver'
import { ProductService } from './product.service'

@Module({
	imports: [SequelizeModule.forFeature([Product])],
	providers: [ProductService, ProductResolver],
})
export class ProductModule {}
