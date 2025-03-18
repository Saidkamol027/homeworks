const { pool } = require('../config/db.config')

exports.getAllUsers = async (req, res) => {
	try {
		const users = await pool.query('SELECT * FROM users;')
		res.status(200).json(users.rows)
	} catch (error) {
		res.status(500).json({ error: 'Server bilan muammo' })
	}
}

exports.getUsersById = async (req, res) => {
	try {
		const { id } = req.params
		const user = await pool.query('SELECT * FROM users WHERE id = $1', [id])

		if (user.rows.length === 0) {
			return res
				.status(404)
				.json({ error: "Bunday 'id'lik foydalanuvchi yo'q" })
		}

		res.status(200).json(user.rows[0])
	} catch (error) {
		res.status(500).json({ error: 'Server bilan muammo' })
	}
}

exports.createUsers = async (req, res) => {
	try {
		const { name, email, password } = req.body

		const existingUser = await pool.query(
			'SELECT * FROM users WHERE email = $1 AND password = $2',
			[email, password]
		)

		if (existingUser.rowCount > 0) {
			return res.status(409).json({
				message:
					'Bunday email va passwordga ega foydalanuvchi allaqachon mavjud',
			})
		}

		const newUser = await pool.query(
			'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
			[name, email, password]
		)

		res.status(201).json({
			message: 'User muvaffaqiyatli yaratildi',
			data: newUser.rows[0],
		})
	} catch (error) {
		res.status(500).json({ error: 'Server bilan muammo' })
	}
}

exports.updateUsers = async (req, res) => {
	try {
		const { id } = req.params
		const { name, email, password } = req.body

		const existingUser = await pool.query(
			'SELECT * FROM users WHERE email = $1 AND id != $2',
			[email, id]
		)

		if (existingUser.rowCount > 0) {
			return res
				.status(409)
				.json({ message: 'Bunday email boshqa foydalanuvchida bor' })
		}

		const updatedUser = await pool.query(
			'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
			[name, email, password, id]
		)

		if (updatedUser.rowCount === 0) {
			return res
				.status(404)
				.json({ message: "Bunday ID'lik foydalanuvchi topilmadi" })
		}

		res.status(200).json(updatedUser.rows[0])
	} catch (error) {
		res.status(500).json({ error: 'Server bilan muammo' })
	}
}

exports.deletUser = async (req, res) => {
	try {
		const { id } = req.params
		const deletedUser = await pool.query(
			'DELETE FROM users WHERE id = $1 RETURNING *',
			[id]
		)

		if (deletedUser.rowCount === 0) {
			return res
				.status(404)
				.json({ error: "Bunday 'id'lik foydalanuvchi yo'q" })
		}

		res.status(200).json({ message: 'User muvaffaqiyatli o‘chirildi' })
	} catch (error) {
		res.status(500).json({ error: 'Server bilan muammo' })
	}
}
