import express, { response } from 'express'
const app = express()
app.use(express.json())

/*
GET: Buscar infos do back-end
POST: Criar nova info no back-end
PUT: Atualziar info existente no back-end
DELETE: Remover info do back-end

Request param: Usado na rota para identificar algum recurso. Obrigatório na rota
Query param: Mesmo que request param porém opicional
Request body: Parâmetros para criação/atualização de infos

SELECT * FROM users WHERE name = 'Yago'
knex('users').where('name', 'yago').select('*')
*/

const users = [
    'Diego',
    'Yago',
    'Mercedes'
]

app.get('/users', function(req, res) {
    const search = String(req.query.search)

    // Se search tem algum valor verificar o indice x, se não tem ele irá valer users
    const filteredUsers = search ? users.filter(user => user.includes
        (search)) : users

    return res.json(filteredUsers)
})

app.get('/users/:id', function(req, res) {
    const id = Number(req.params.id)

    const user = users[id]

    return res.json(user)
})

app.post('/users', function(req, res) {
    const data = req.body

    const user = {
        nome: data.name,
        email: data.email
    }

    return res.json(user)
})

app.listen(8080)
