import 'dotenv/config'
import { Bot } from 'grammy'
import { Photo, sequelize, User } from './db.js'

const bot = new Bot(process.env.BOT_TOKEN)
const OWNER_ID = process.env.OWNER_ID

await sequelize.sync({ alter: true })

bot.command('start', async ctx => {
	await User.findOrCreate({
		where: { id: ctx.from.id },
		defaults: { username: ctx.from.username || null },
	})

	await ctx.reply(
		'Assalomu alaykum!\n\nSiz quyidagilarni qila olasiz:\n' +
			'📷 Rasm yuboring → bot uni saqlaydi\n' +
			'🖼 /rasm → oxirgi rasmni qaytaradi\n' +
			'✉️ @username yozing → o‘sha odamga xabar yuboriladi'
	)
})

bot.on('message:photo', async ctx => {
	const photo = ctx.message.photo.pop()
	await Photo.create({
		fileId: photo.file_id,
		userId: ctx.from.id,
	})

	await ctx.reply('Rasmingiz saqlandi ✅')
})

bot.command('rasm', async ctx => {
	const lastPhoto = await Photo.findOne({
		where: { userId: ctx.from.id },
		order: [['createdAt', 'DESC']],
	})

	if (!lastPhoto) return ctx.reply('Siz hali rasm yubormagansiz ❌')

	if (ctx.from.id.toString() === OWNER_ID) {
		const users = await User.findAll()

		for (const user of users) {
			try {
				await bot.api.sendPhoto(user.id.toString(), lastPhoto.fileId, {
					caption: `👑Rasm @${ctx.from.username} tomonidan yuborilgan rasm 📷`,
				})
			} catch (err) {
				console.log(
					`❌ ${user.username || user.id} ga yuborilmadi:`,
					err.message
				)
			}
		}

		await ctx.reply('Rasmingiz barcha foydalanuvchilarga yuborildi ✅')
	} else {
		await ctx.replyWithPhoto(lastPhoto.fileId, {
			caption: 'Sizning oxirgi rasmingiz 📷',
		})
	}
})

bot.on('message:text', async ctx => {
	const text = ctx.message.text
	const match = text.match(/@(\w+)/)

	if (match) {
		const username = match[1]
		const user = await User.findOne({ where: { username } })

		if (user) {
			try {
				await bot.api.sendMessage(
					user.id.toString(),
					`Sizga xabar keldi: ${text}`
				)
				await ctx.reply(`Xabaringiz @${username} ga yuborildi ✅`)
			} catch (err) {
				await ctx.reply(
					`@${username} bazada bor, lekin hali botni ishga tushirmagan yoki bloklagan ❌`
				)
			}
		} else {
			await ctx.reply(
				`@${username} bazada topilmadi ❌\nIltimos, u odam bir marta bo‘lsa ham botga /start bosishi kerak.`
			)
		}
	}
})

bot.start()
console.log('Bot started')
