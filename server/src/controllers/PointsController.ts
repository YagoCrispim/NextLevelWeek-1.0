import { Request, Response } from 'express'
import knex from '../database/connection'

class PointsController {

    async index(req: Request, res: Response) {
        const city = req.query.city
        const uf = req.query.uf
        const items = req.query.items

        // Retira os espaços(caso exista) e transforma a query em array numérico
        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()))

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*')

        if (!points) {
            res.json({ status: 400, message: "Local não localizado" })
        }

        return res.json(points)
    }

    async show(req: Request, res: Response) {
        const id = req.params.id

        const point = await knex('points').where('id', id).first()

        if (!point) {
            return res.status(400).json({ message: 'Point not found' })
        }

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title')

        return res.json({ point, items })

    }

    async create(req: Request, res: Response) {
        // Recurso de desestruturação
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items // == items = req.body.items
        } = req.body

        const trx = await knex.transaction()

        const point = {
            image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }


        // Assim que executado o metodo insert retorna o id dos dados inseridos
        const insertedIds = await trx('points').insert(point)

        const point_id = insertedIds[0]

        const pointItems = items.map(function(item_id: number) {
            return {
                item_id,
                point_id: insertedIds[0],
            }
        })


        // Sempre que usar o trx deve dar o commit para gravar os dados
        await trx('point_items').insert(pointItems)

        await trx.commit()

        return res.json({
            // ... = Retorna todas as infos
            id: point_id,
            ...point,
        })
    }
}

export default PointsController
