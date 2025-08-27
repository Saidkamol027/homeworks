import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript'
import { Category } from '../../category/entities/category.entity'
import { Sale } from '../../sale/entities/sale.entity'

@Table
export class Product extends Model<Product> {
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	name: string

	@ForeignKey(() => Category)
	@Column
	categoryId: number

	@BelongsTo(() => Category)
	category: Category

	@HasMany(() => Sale)
	sales: Sale[]
}
