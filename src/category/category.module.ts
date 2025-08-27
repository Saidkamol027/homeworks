import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { CategoryResolver } from './category.resolver'
import { CategoryService } from './category.service'
import { Category } from './entities/category.entity'

@Module({
	imports: [SequelizeModule.forFeature([Category])],
	providers: [CategoryService, CategoryResolver],
})
export class CategoryModule {}
