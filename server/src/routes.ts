import express, { response } from 'express'

import PointsController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController'

const routes = express.Router() // possibilita desacoplar as rotas
const pointsController = new PointsController()
const itemsController = new ItemsController()

routes.get('/', function(req, res) {

    return res.json({ message: 'Hello, world' })

})

// Selecionar os itens do BD
// Sempre que rodar uma query usar async/await
routes.get('/items', itemsController.index)
routes.get('/points', pointsController.index)
routes.post('/points', pointsController.create)
routes.get('/points/:id', pointsController.show)

export default routes
