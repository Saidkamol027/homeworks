import {
	BelongsToMany,
	Column,
	DataType,
	Model,
	Table,
} from 'sequelize-typescript'
import { Course } from '../../course/schema/course.schema'
import { StudentCourse } from '../../course/schema/student-course.schema'
@Table({ tableName: 'students' })
export class Student extends Model {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	})
	declare id: number

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	name: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true,
	})
	email: string

	@BelongsToMany(() => Course, () => StudentCourse)
	courses: Course[]
}
