import { Product } from './../../product/entities/product.entity'
// src/category/category.entity.ts
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'

@ObjectType()
@Table({ tableName: 'categories' })
export class Category extends Model<Category> {
	@Field(() => Int)
	@Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
	declare id: number

	@Field()
	@Column({ type: DataType.STRING, allowNull: false })
	name: string

	@Field(() => [Product], { nullable: true })
	@HasMany(() => Product)
	products?: Product[]
}
