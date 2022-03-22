import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

/* Navigators */
import AuthNavigator from './AuthNavigator';
import TasksNavigator from './TasksNavigator';

/* Hooks */
import useAuth from '../hooks/useAuth';

const Stack = createStackNavigator();

/* Componente para definir la navegación principal */
const Navigator = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Stack.Navigator
            screenOptions={{ 
                headerShown: false
            }}
        >
            {
                !isAuthenticated ? (
                    /** 
                     * Evaluación si el usuario esta atenticado o no para 
                     * mostrar una navegación 
                    */
                    <Stack.Screen name="AuthNavigator" component={ AuthNavigator } />
                ) : (
                    <Stack.Screen name="TasksNavigator" component={ TasksNavigator } />
                )
            }
        </Stack.Navigator>
    );
}

export default Navigator;