import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { Comment } from '../../comments/entities/comment.entity'
import { Post } from '../../posts/entities/post.entity'

@Table({ tableName: 'users' })
export class User extends Model {
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	declare name: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true,
	})
	declare phone: string

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	declare age: Number

	@HasMany(() => Post)
	declare posts: Post[]

	@HasMany(() => Comment)
	declare comments: Comment[]
}
