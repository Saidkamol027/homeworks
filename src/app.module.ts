import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { CarsModule } from './cars/cars.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.DB_HOST || 'cars_db',
			port: Number(process.env.DB_PORT) || 5432,
			username: process.env.DB_USER || 'postgres',
			password: process.env.DB_PASS || 'postgres',
			database: process.env.DB_NAME || 'cars_db',
			autoLoadModels: true,
			synchronize: true,
		}),
		CarsModule,
	],
})
export class AppModule {}
