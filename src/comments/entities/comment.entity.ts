import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import { Post } from '../../posts/entities/post.entity'
import { User } from '../../users/entities/user.entity'

@Table({ tableName: 'comments' })
export class Comment extends Model {
	@Column({
		type: DataType.TEXT,
		allowNull: false,
	})
	declare content: string

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	declare userId: number

	@ForeignKey(() => Post)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	declare postId: number

	@BelongsTo(() => User)
	declare user: User

	@BelongsTo(() => Post)
	declare post: Post
}
