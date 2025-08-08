import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { Post } from '../../posts/entities/post.entity'

@Table({ tableName: 'categories' })
export class Category extends Model {
	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true,
	})
	declare name: string

	@HasMany(() => Post)
	declare posts: Post[]
}
