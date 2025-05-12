const fs = require('node:fs')
const http = require('node:http')
const path = require('node:path')

const filePath = path.join(__dirname, 'data', 'fruits.json')

const server = http.createServer((req, res) => {
	const method = req.method
	const url = req.url

	if (method === 'GET' && url === '/') {
		const mevalar = fs.readFileSync(filePath, 'utf-8')
		res.writeHead(200, { 'Content-Type': 'application/json' })
		res.end(mevalar)
	} else if (method === 'POST' && url === '/mevalar') {
		let body = ''
		req.on('data', chunk => {
			body += chunk
		})
		req.on('end', () => {
			const fruits = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
			const newFruit = JSON.parse(body)
			newFruit.id = fruits.length + 1
			fruits.push(newFruit)
			fs.writeFileSync(filePath, JSON.stringify(fruits, null, 2))
			res.writeHead(200, { 'Content-Type': 'application/json' })
			res.end(JSON.stringify({ message: 'Malumot muvaffaqiyatli yozildi' }))
		})
	} else if (method === 'DELETE' && url.startsWith('/mevalar/')) {
		const id = Number(url.split('/')[2])
		const fruits = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
		const deleteFruit = fruits.filter(meva => meva.id !== id)
		fs.writeFileSync(filePath, JSON.stringify(deleteFruit, null, 2))
		res.writeHead(200, { 'Content-Type': 'application/json' })
		res.end(JSON.stringify({ message: 'Malumotlar muvaffaqiyatli ochirildi' }))
	} else if (method === 'PATCH' && url.startsWith('/mevalar/')) {
		const id = Number(url.split('/')[2])
		let body = ''
		req.on('data', chunk => {
			body += chunk
		})
		req.on('end', () => {
			const data = JSON.parse(body)
			const fruits = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

			const update = fruits.map(fruit => {
				if (fruit.id === id) {
					return { ...fruit, ...data }
				}
				return fruit
			})

			fs.writeFileSync(filePath, JSON.stringify(update, null, 2))
			res.writeHead(200, { 'Content-Type': 'application/json' })
			res.end(
				JSON.stringify({ message: 'Malumotlar muvaffaqiyatli yangilandi!' })
			)
		})
	} else {
		res.writeHead(404, { 'Content-Type': 'application/json' })
		res.end(JSON.stringify({ message: 'Not Found' }))
	}
})

const PORT = 3000
server.listen(PORT, () => {
	console.log(`Server ${PORT} da ishlamoqda`)
})
