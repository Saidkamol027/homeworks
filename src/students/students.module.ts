import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Student } from './schema/student.schema'
import { StudentsController } from './students.controller'
import { StudentsService } from './students.service'

@Module({
	imports: [SequelizeModule.forFeature([Student])],
	controllers: [StudentsController],
	providers: [StudentsService],
})
export class StudentsModule {}
