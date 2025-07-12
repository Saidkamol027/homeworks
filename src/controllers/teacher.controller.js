import { pool } from '../config/db.config.js'

export class TeacherController {
	async getAllTeacher(req, res) {
		try {
			const result = await pool.query('SELECT * FROM teachers')
			res.status(200).json(result.rows)
		} catch (err) {
			res.status(500).json({ message: 'Server error' })
		}
	}

	async getTeacherById(req, res) {
		try {
			const { id } = req.params
			const result = await pool.query('SELECT * FROM teachers WHERE id = $1', [
				id,
			])
			if (!result.rows.length) {
				return res.status(404).json({ message: 'Not found' })
			}
			res.status(200).json(result.rows[0])
		} catch (err) {
			res.status(500).json({ message: 'Server error' })
		}
	}

	async createTeacher(req, res) {
		try {
			const { id, full_name, special } = req.body
			const result = await pool.query(
				`INSERT INTO teachers (id, full_name, special)
         VALUES ($1, $2, $3) RETURNING *`,
				[id, full_name, special]
			)
			res.status(201).json(result.rows[0])
		} catch (err) {
			res.status(500).json({ message: 'Server error' })
		}
	}

	async updateTeacher(req, res) {
		try {
			const { id } = req.params
			const { full_name, special } = req.body
			const result = await pool.query(
				`UPDATE teachers SET full_name = $1, special = $2
         WHERE id = $3 RETURNING *`,
				[full_name, special, id]
			)
			if (!result.rows.length) {
				return res.status(404).json({ message: 'Not found' })
			}
			res.status(200).json(result.rows[0])
		} catch (err) {
			res.status(500).json({ message: 'Server error' })
		}
	}

	async deleteTeacher(req, res) {
		try {
			const { id } = req.params
			const result = await pool.query(
				'DELETE FROM teachers WHERE id = $1 RETURNING *',
				[id]
			)
			if (!result.rows.length) {
				return res.status(404).json({ message: 'Not found' })
			}
			res.status(200).json({ message: 'Deleted', data: result.rows[0] })
		} catch (err) {
			res.status(500).json({ message: 'Server error' })
		}
	}
}
