import { DataTypes, Sequelize } from 'sequelize'

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: 'postgres',
	logging: false,
})

export const User = sequelize.define('User', {
	id: { type: DataTypes.BIGINT, primaryKey: true },
	username: { type: DataTypes.STRING },
})

export const Message = sequelize.define('Message', {
	text: { type: DataTypes.TEXT },
})

export const Photo = sequelize.define('Photo', {
	fileId: { type: DataTypes.STRING },
})

User.hasMany(Message, { foreignKey: 'userId' })
Message.belongsTo(User, { foreignKey: 'userId' })

User.hasMany(Photo, { foreignKey: 'userId' })
Photo.belongsTo(User, { foreignKey: 'userId' })

export { sequelize }
