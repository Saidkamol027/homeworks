import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { CarsController } from './cars.controller'
import { CarsService } from './cars.service'
import { Car } from './entities/car.entity'

@Module({
	imports: [SequelizeModule.forFeature([Car])],
	controllers: [CarsController],
	providers: [CarsService],
})
export class CarsModule {}
