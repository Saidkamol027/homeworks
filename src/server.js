const express = require('express')
const { userRoute } = require('./route/users.route')
const { postRoute } = require('./route/posts.route')
const app = express()
app.use(express.json())

const port = process.env.PORT || 5000

app.use('/users', userRoute)
app.use('/posts', postRoute)
app.listen(port, (req, res) => {
	console.log(`Server ${port} da ishlamoqda`)
})
