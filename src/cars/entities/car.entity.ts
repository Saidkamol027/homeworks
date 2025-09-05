import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({ tableName: 'cars' })
export class Car extends Model<Car> {
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
	brand: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	model: string

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	year: number
}
