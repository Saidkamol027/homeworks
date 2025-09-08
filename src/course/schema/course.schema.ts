import {
	BelongsToMany,
	Column,
	DataType,
	Model,
	Table,
} from 'sequelize-typescript'
import { Student } from '../../students/schema/student.schema'
import { StudentCourse } from './student-course.schema'

@Table({ tableName: 'Courses' })
export class Course extends Model {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	})
	declare id: number

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	title: string

	@Column({
		type: DataType.TEXT,
		allowNull: false,
	})
	description: string

	@BelongsToMany(() => Student, () => StudentCourse)
	students: Student[]
}
