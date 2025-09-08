import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { CourseModule } from './course/course.module'
import { Course } from './course/schema/course.schema'
import { StudentCourse } from './course/schema/student-course.schema'
import { Student } from './students/schema/student.schema'
import { StudentsModule } from './students/students.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: String(process.env.DB_HOST),
			port: Number(process.env.DB_PORT),
			username: String(process.env.DB_USER),
			password: String(process.env.DB_PASS),
			database: String(process.env.DB_NAME),
			models: [Student, Course, StudentCourse],
			autoLoadModels: true,
			synchronize: true,
		}),
		StudentsModule,
		CourseModule,
	],
})
export class AppModule {}
