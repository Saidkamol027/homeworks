import { config } from 'dotenv'
import { Pool } from 'pg'
config()

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	password: process.env.DB_PASS,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
})

pool
	.connect()
	.then(() => {
		console.log('Postgresga muvaffaqiyatli ulandi')
	})
	.catch(err => {
		console.error('Postgresga ulanishda xatolik', err)
	})

const APP_PORT = parseInt(process.env.PORT)
export { APP_PORT, pool }
