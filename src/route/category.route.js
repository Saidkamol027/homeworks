const { Router } = require('express')
const categoriesRoute = Router()
const {
	createCategories,
	deleteCategories,
	getAllCategories,
	getAllCategoriesById,
	updateCategories,
	getProductByCategoryId,
} = require('../controller/category.controller')

categoriesRoute.get('/', getAllCategories)
categoriesRoute.post('/', createCategories)
categoriesRoute.get('/:id', getAllCategoriesById)
categoriesRoute.patch('/:id', updateCategories)
categoriesRoute.delete('/:id', deleteCategories)
categoriesRoute.get('/:id/products', getProductByCategoryId)

module.exports = { categoriesRoute }
