const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')
const { isDeepStrictEqual } = require('node:util')
const { DatabaseSync } = require('node:sqlite')
const PORT = 3000
const filePath = path.join(__dirname, 'data', 'user.json')
const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

const server = http.createServer((req, res) => {
	const method = req.method
	const url = req.url

	if (method === 'GET' && url === '/users') {
		const users = fs.readFileSync(filePath, 'utf-8')

		res.writeHead(200)
		res.end(users)
	}
	if (method === 'POST' && url === '/user') {
		let body = ''
		req.on('data', chunk => {
			body += chunk
		})
		req.on('end', () => {
			const data = JSON.parse(body)
			const newUser = { id: users.at(-1).id + 1, ...data }
			users.push(newUser)

			fs.writeFileSync(filePath, JSON.stringify(users, null, 2))

			res.writeHead(200)
			res.end(JSON.stringify(newUser))
		})
	}
	if (method === 'PATCH' && url.startsWith('/user/')) {
		const id = url.split('/')[2]
		const index = users.findIndex(user => user.id == id)

		if (index === -1) {
			return res.end(JSON.stringify({ message: 'User not found' }))
		}

		let body = ''
		req.on('data', chunk => {
			body += chunk
		})
		req.on('end', () => {
			const data = JSON.parse(body)
			users[index].name = data.name
			users[index].age = data.age

			fs.writeFileSync(filePath, JSON.stringify(users, null, 2))

			res.writeHead(200)
			res.end(JSON.stringify(users))
		})
	}

	if (method === 'DELETE' && url.startsWith('/user/')) {
		const id = url.split('/')[2]
		const index = users.findIndex(user => user.id == id)

		if (index === -1) {
			res.writeHead(404)
			return res.end(JSON.stringify({ message: 'User not found' }))
		}

		users.splice(index, 1)

		fs.writeFileSync(filePath, JSON.stringify(users, null, 2))

		res.writeHead(200)
		res.end(JSON.stringify({ message: 'User deleted successfully' }))
	}
})

server.listen(PORT, () => {
	console.log(`Server ${PORT} da ishlamoqda`)
})
