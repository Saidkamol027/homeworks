const { pool } = require('../config/db.config')

exports.getAllPosts = async (req, res) => {
	try {
		const posts = await pool.query('SELECT * FROM posts;')
		res.status(200).json(posts.rows)
	} catch (error) {
		res.status(500).json({ error: 'Server bilan muammo' })
	}
}

exports.getPostsByUserId = async (req, res) => {
	try {
		const { user_id } = req.params
		const posts = await pool.query('SELECT * FROM posts WHERE user_id = $1', [
			user_id,
		])

		if (posts.rows.length === 0) {
			return res
				.status(404)
				.json({ error: 'Ushbu foydalanuvchiga tegishli postlar topilmadi' })
		}

		res.status(200).json(posts.rows)
	} catch (error) {
		res.status(500).json({ error: 'Server bilan muammo' })
	}
}

exports.createPost = async (req, res) => {
	try {
		const { user_id, title, content } = req.body

		const newPost = await pool.query(
			'INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3) RETURNING *',
			[user_id, title, content]
		)

		res.status(201).json({
			message: 'Post muvaffaqiyatli yaratildi',
			data: newPost.rows[0],
		})
	} catch (error) {
		res.status(500).json({ error: 'Server bilan muammo' })
	}
}

exports.updatePost = async (req, res) => {
	try {
		const { id } = req.params
		const { title, content } = req.body

		const updatedPost = await pool.query(
			'UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *',
			[title, content, id]
		)

		if (updatedPost.rowCount === 0) {
			return res.status(404).json({ message: "Bunday ID'lik post topilmadi" })
		}

		res.status(200).json(updatedPost.rows[0])
	} catch (error) {
		res.status(500).json({ error: 'Server bilan muammo' })
	}
}

exports.deletePost = async (req, res) => {
	try {
		const { id } = req.params
		const deletedPost = await pool.query(
			'DELETE FROM posts WHERE id = $1 RETURNING *',
			[id]
		)

		if (deletedPost.rowCount === 0) {
			return res.status(404).json({ error: "Bunday ID'lik post topilmadi" })
		}

		res.status(200).json({ message: 'Post muvaffaqiyatli o‘chirildi' })
	} catch (error) {
		res.status(500).json({ error: 'Server bilan muammo' })
	}
}
