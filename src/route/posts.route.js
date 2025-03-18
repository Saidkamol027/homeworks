const { Router } = require('express')
const {
	getAllPosts,
	getPostsByUserId,
	createPost,
	updatePost,
	deletePost,
} = require('../controller/posts.controller')

const postRoute = Router()

postRoute.get('/', getAllPosts)
postRoute.get('/user/:user_id', getPostsByUserId)
postRoute.post('/', createPost)
postRoute.patch('/:id', updatePost)
postRoute.delete('/:id', deletePost)

module.exports = { postRoute }
