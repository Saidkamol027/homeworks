import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript'
import { Category } from '../../categorys/entities/category.entity'
import { Comment } from '../../comments/entities/comment.entity'
import { User } from '../../users/entities/user.entity'

@Table({ tableName: 'posts' })
export class Post extends Model {
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	declare title: string

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

	@ForeignKey(() => Category)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	declare categoryId: number

	@BelongsTo(() => User)
	declare user: User

	@BelongsTo(() => Category)
	declare category: Category

	@HasMany(() => Comment)
	declare comments: Comment[]
}
