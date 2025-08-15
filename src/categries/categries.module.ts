import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategriesController } from './categries.controller'
import { CategriesService } from './categries.service'
import { Category } from './entities/categry.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Category])],
	controllers: [CategriesController],
	providers: [CategriesService],
	exports: [TypeOrmModule],
})
export class CategriesModule {}
