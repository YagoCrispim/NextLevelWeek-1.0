import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './pages/Home'
import Points from './pages/Points'
import Detail from './pages/Detail'

const AppStack = createStackNavigator()

/**
 * AppStack irá funcionar como roteamento do app
 * 
 * Navigation container deve sempre estar em volta de todas as rotas do app
 * 
 * Para cada tela do app terá uma rota dessa
 * <AppStack.Screen name="nome_da_rota" component={componente_que_sera_exibido_quando_a_rota_estiver_ativa} />
 * 
 * headerMode="none" -> Remove o header com o titulo da page
 * 
 * cardStyle -> A cor determinada lá dentro será aplicada em todas as telas do app
 */

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator
                headerMode="none"
                screenOptions={{
                    cardStyle: {
                        backgroundColor: '#f0f0f5'
                    }
                }}
            >
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Points" component={Points} />
                <AppStack.Screen name="Detail" component={Detail} />
                
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes