const http = require('http')

const quizSavollar = [
	{
		savol: 'JavaScriptda funksiyani qanday chaqiramiz?',
		variantlar: ['A) functionName()', 'B) function Name', 'C) function-name()'],
		togri: 'A',
	},
	{
		savol: 'HTMLda eng katta sarlavha tegi qaysi?',
		variantlar: ['A) <h1>', 'B) <h6>', 'C) <title>'],
		togri: 'A',
	},
	{
		savol: 'CSSda ranglarni berish usuli qaysi?',
		variantlar: [
			'A) color: red;',
			'B) text-color: blue;',
			'C) background: 255, 0, 0;',
		],
		togri: 'A',
	},
]

const server = http.createServer((req, res) => {
	if (req.method === 'GET') {
		res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })

		let html = `
            <!DOCTYPE html>
            <html lang="uz">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Quiz Savollar</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4; }
                    .savol { font-weight: bold; margin-top: 15px; font-size: 18px; }
                    ul { list-style-type: none; padding: 0; }
                    li { margin-bottom: 5px; background: white; padding: 10px; border-radius: 5px; box-shadow: 1px 1px 5px rgba(0,0,0,0.1); }
                </style>
            </head>
            <body>
                <h1>Quiz Savollar</h1>
        `

		quizSavollar.forEach((quiz, index) => {
			html += `<div class="savol">${index + 1}. ${quiz.savol}</div>`
			html += '<ul>'
			quiz.variantlar.forEach(variant => {
				let safeVariant = variant.replace(/</g, '&lt;').replace(/>/g, '&gt;') // HTML xatoni oldini olish
				html += `<li>${safeVariant}</li>`
			})
			html += '</ul>'
		})

		html += `</body></html>`

		res.end(html)
	} else {
		res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
		res.end('Sahifa topilmadi')
	}
})

const PORT = 4000
server.listen(PORT, () => {
	console.log(`Server ${PORT} portda ishlayapti`)
})
