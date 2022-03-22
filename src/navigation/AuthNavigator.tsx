import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

/* Layouts */
import LinearGradientLayout from '../layout/LinearGradientLayout';

/* Screens */
import RegisterScreen from '../screens/auth/RegisterScreen';
import LoginScreen from '../screens/auth/LoginScreen';

/* Propiedades de la navegación */
export type AuthNavigatorParams = {
    LoginScreen: undefined;
    RegisterScreen: undefined;
}

const Stack = createStackNavigator<AuthNavigatorParams>();

/* Pantallas con su layout */
const Login = (props: any) => <LinearGradientLayout children={ <LoginScreen { ...props } /> } />;
const Register = (props: any) => <LinearGradientLayout children={ <RegisterScreen { ...props } /> } />;

/* Componente para definir la navegación de autenticación */
const AuthNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ 
                headerShown: false,
                cardStyle: { flex: 1 },
                ...TransitionPresets.SlideFromRightIOS
            }}
        >
            <Stack.Screen name="LoginScreen" component={ Login } />
            <Stack.Screen name="RegisterScreen" component={ Register } />
        </Stack.Navigator>
    );
}

export default AuthNavigator;