import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import { Factory } from './../../factory/entities/factory.entity'

@Table({ tableName: 'employees' })
export class Employee extends Model {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: number

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	firstName: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	lastName: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	position: string

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	salary: number

	@ForeignKey(() => Factory)
	@Column({ type: DataType.INTEGER })
	factoryId: number

	@BelongsTo(() => Factory)
	factory: Factory
}
