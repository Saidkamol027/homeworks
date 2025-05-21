import { Router } from 'express'
import FruitController from '../controllers/fruit.controller.js'

const fruitRoute = Router()

fruitRoute.get('/', FruitController.getAllFruit)
fruitRoute.get('/:id', FruitController.getFruitById)
fruitRoute.post('/', FruitController.createFruit)
fruitRoute.patch('/:id', FruitController.updateFruit)
fruitRoute.delete('/:id', FruitController.deleteFruit)

export { fruitRoute }
