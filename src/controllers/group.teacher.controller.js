import { pool } from '../config/db.config.js'

export class GroupTeacherController {
	async getAll(req, res) {
		try {
			const result = await pool.query('SELECT * FROM groups_teachers')
			res.json(result.rows)
		} catch (err) {
			res.status(500).json({ message: 'Server error' })
		}
	}

	async getById(req, res) {
		try {
			const { id } = req.params
			const result = await pool.query(
				'SELECT * FROM groups_teachers WHERE id = $1',
				[id]
			)
			if (!result.rows.length)
				return res.status(404).json({ message: 'Not found' })
			res.json(result.rows[0])
		} catch (err) {
			res.status(500).json({ message: 'Server error' })
		}
	}

	async create(req, res) {
		try {
			const { id, group_id, teacher_id } = req.body
			const result = await pool.query(
				`
        INSERT INTO groups_teachers (id, group_id, teacher_id)
        VALUES ($1, $2, $3) RETURNING *`,
				[id, group_id, teacher_id]
			)
			res.status(201).json(result.rows[0])
		} catch (err) {
			res.status(500).json({ message: 'Server error' })
		}
	}

	async update(req, res) {
		try {
			const { group_id, teacher_id } = req.body
			const { id } = req.params
			const result = await pool.query(
				`
        UPDATE groups_teachers
        SET group_id = $1, teacher_id = $2
        WHERE id = $3 RETURNING *`,
				[group_id, teacher_id, id]
			)
			if (!result.rows.length)
				return res.status(404).json({ message: 'Not found' })
			res.json(result.rows[0])
		} catch (err) {
			res.status(500).json({ message: 'Server error' })
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params
			const result = await pool.query(
				'DELETE FROM groups_teachers WHERE id = $1 RETURNING *',
				[id]
			)
			if (!result.rows.length)
				return res.status(404).json({ message: 'Not found' })
			res.json({ message: 'Deleted', data: result.rows[0] })
		} catch (err) {
			res.status(500).json({ message: 'Server error' })
		}
	}
}
