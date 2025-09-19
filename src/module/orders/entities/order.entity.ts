import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({ tableName: 'orders', timestamps: true })
export class Order extends Model<Order> {
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
	product: string

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	quantity: number

	@Column({
		type: DataType.ENUM('pending', 'confirmed', 'cancelled'),
		allowNull: false,
		defaultValue: 'pending',
	})
	status: string
}
