import { pool } from '../config/db.config.js'

export class PassportInfoController {
	async getAll(req, res) {
		try {
			const result = await pool.query('SELECT * FROM passport_info_student')
			res.json(result.rows)
		} catch (err) {
			res.status(500).json({ message: 'Server error' })
		}
	}

	async getById(req, res) {
		try {
			const { id } = req.params
			const result = await pool.query(
				'SELECT * FROM passport_info_student WHERE id = $1',
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
			const { id, seria, jshshir, student_id } = req.body
			const result = await pool.query(
				`
        INSERT INTO passport_info_student (id, seria, jshshir, student_id)
        VALUES ($1, $2, $3, $4) RETURNING *`,
				[id, seria, jshshir, student_id]
			)
			res.status(201).json(result.rows[0])
		} catch (err) {
			res.status(500).json({ message: 'Server error' })
		}
	}

	async update(req, res) {
		try {
			const { id } = req.params
			const { seria, jshshir, student_id } = req.body
			const result = await pool.query(
				`
        UPDATE passport_info_student
        SET seria = $1, jshshir = $2, student_id = $3
        WHERE id = $4 RETURNING *`,
				[seria, jshshir, student_id, id]
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
				'DELETE FROM passport_info_student WHERE id = $1 RETURNING *',
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
