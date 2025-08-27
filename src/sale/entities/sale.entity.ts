import { Product } from './../../product/entities/product.entity'
// src/sale/sale.entity.ts
import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'

@ObjectType()
@Table({ tableName: 'sales' })
export class Sale extends Model<Sale> {
	@Field(() => Int)
	@Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
	declare id: number

	@Field(() => Float)
	@Column({ type: DataType.FLOAT, allowNull: false })
	amount: number

	@Field(() => Int)
	@ForeignKey(() => Product)
	@Column({ type: DataType.INTEGER, allowNull: false })
	productId: number

	@Field(() => Product)
	@BelongsTo(() => Product)
	product: Product
}
