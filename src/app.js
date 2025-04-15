import express from 'express'
import { engine } from 'express-handlebars'
import { createServer } from 'http'
import path from 'path'
import { Server as SocketIO } from 'socket.io'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const httpServer = createServer(app)
const io = new SocketIO(httpServer)

app.use(express.static(path.join(__dirname, 'public')))

app.engine(
	'handlebars',
	engine({
		layoutsDir: path.join(__dirname, 'view/layouts'),
		defaultLayout: 'main',
	})
)
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'view'))

app.get('/', (req, res) => {
	res.render('chat')
})

io.on('connection', socket => {
	console.log('🟢 Foydalanuvchi ulandi')

	socket.on('joinRoom', ({ room, username }) => {
		socket.join(room)
		const time = new Date().toLocaleTimeString()
		socket.to(room).emit('message', {
			msg: `${username} chatga qo‘shildi`,
			sender: 'System',
			time,
		})
	})

	socket.on('chatMessage', ({ room, msg, username }) => {
		const time = new Date().toLocaleTimeString()
		io.to(room).emit('message', { msg, sender: username, time })
	})

	socket.on('typing', ({ room, username }) => {
		socket.to(room).emit('typing', username)
	})

	socket.on('disconnect', () => {
		console.log('❌ Foydalanuvchi chiqdi')
	})
})

export { httpServer }
