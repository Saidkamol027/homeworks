import { config } from 'dotenv'
config()

const APP_PORT = parseInt(process.env.PORT, 10) || 5000

export default APP_PORT
