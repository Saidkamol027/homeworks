import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 3000 })

wss.on('connection', function connection(ws) {
	console.log('New user connected')

	ws.on('message', function incoming(message) {
		wss.clients.forEach(client => {
			if (client.readyState === ws.OPEN) {
				client.send(message.toString())
			}
		})
	})
	console.log('Hello')

	ws.send('Welcome to the chat')
})

console.log(`✅ Server listening on port: 3000`)
