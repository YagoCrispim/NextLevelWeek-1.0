import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import CreatePoint from './pages/CreatePoint'

/**
exact -> O router irá verificar o path. Tanto '/'
quanto '/create-point' começam com '/'. O router
entenderá que as duas são a mesma rota. Deve-se
usar o exact para que o router acesse a rota '/'
somente quando a rota for exatamente igual '/'.
*/

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={CreatePoint} path="/create-point" />
        </BrowserRouter>
    )
}

export default Routes
