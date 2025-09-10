import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { Employee } from './../../employe/entities/employe.entity'

@Table({ tableName: 'factories' })
export class Factory extends Model {
	@Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
	declare id: number

	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	name: string

	@Column({ type: DataType.INTEGER, allowNull: false })
	numberOfWorkers: number

	@HasMany(() => Employee)
	employees: Employee[]
}
