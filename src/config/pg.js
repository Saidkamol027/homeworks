require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
})

pool
	.connect()
	.then(() => console.log('Postgrestga muvaffaqiyatli ulandi'))
	.catch(err => console.log('Ulanichda muammo', err))

module.exports = { pool }
