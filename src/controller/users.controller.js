const { pool } = require('../config/db.config')

exports.getAllUsers = async (req, res) => {
	try {
		const users = await pool.query('SELECT * FROM users;')
		res.status(400).json(users.rows)
	} catch (error) {
		throw new Error({ error: 'Server bilan muammo' })
	}
}

exports.getUsersById = async (req, res) => {
	try {
		const { id } = req.params
		const user = await pool.query('SELECT * FROM users WHERE id = $1', [id])

		if (user.rows.length === 0) {
			res.status(404).json({ error: "Bunda 'id'lik foydalanuvchi yo'q" })
		}

		res.status(200).json(user.rows)
	} catch (error) {
		throw new Error({ error: 'Server bilan muammo' })
	}
}

exports.createUsers = async (req, res) => {
	try {
		const { name, email, password } = req.body

		const foundedUser = await pool.query(
			'SELECT * FROM users WHERE email = $1 AND password = $2 RETURNING *',
			[email, password]
		)

		if (foundedUser.rowCount) {
			res
				.status(409)
				.json({ message: 'Bunda email va passworlik user allaqachon mavjud' })
		}

		const user = await pool.query(
			'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
			[name, email, password]
		)

		res.status(200).json({
			message: 'User malumotlari muvaffaqaiyatli kiritildi',
			data: user,
		})
	} catch (error) {
		throw new Error({ error: 'Server bilan muammo' })
	}
}

exports.updateUsers = async (req, res) => {
	try {
		const { id } = req.params
		const { name, email, password } = req.body

		const foundedUser = await pool.query(
			'SELECT * FROM users WHERE email = $1 AND password = $2 RETURNING *',
			[email, password]
		)

		if (foundedUser.rowCount) {
			res
				.status(409)
				.json({ message: 'Bunda email va passworlik user allaqachon mavjud' })
		}

		const user = await pool.query(
			'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
			[name, email, password, id]
		)

		res.status(200).json(user.rows)
	} catch (error) {
		throw new Error({ error: 'Server bilan muammo' })
	}
}


