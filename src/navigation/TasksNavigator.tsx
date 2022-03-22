import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

/* Layouts */
import LinearGradientLayout from '../layout/LinearGradientLayout';

/* Screens */
import CreateTaskScreen from '../screens/tasks/CreateTaskScreen';
import HomeScreen from '../screens/tasks/HomeScreen';
import ProfileScreen from '../screens/auth/ProfileScreen';
import SearchScreen from '../screens/tasks/SearchScreen';

/* Interfaces */
import { TasksStatus } from '../interfaces/tasks';

/* Theme */
import { colors } from '../theme/app-theme';

/* Propiedades para la navegación */
export type TasksNavigatorParams = {
    HomeScreen: undefined;
    CreateTaskScreen: { taskStatus: TasksStatus };
    SearchScreen: undefined;
    ProfileScreen: undefined;
}

const Drawer = createDrawerNavigator<TasksNavigatorParams>();

/* Pantallas con su layout */
const CreateTask = (props: any) => <LinearGradientLayout modalOpacity={ 0 } children={ <CreateTaskScreen { ...props } /> } />;
const Home = (props: any) => <LinearGradientLayout children={ <HomeScreen { ...props } /> } />;
const Profile = (props: any) => <LinearGradientLayout children={ <ProfileScreen { ...props } /> } />;
const Search = (props: any) => <LinearGradientLayout modalOpacity={ 0 } children={ <SearchScreen { ...props } /> } />;

/* Componente para definir la navegación de las tareas */
const TasksNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{ 
                headerShown: false,
                drawerPosition: 'left',
                drawerStyle: styles.drawerStyle,
                drawerItemStyle: styles.drawerItemStyle,
                drawerLabelStyle: styles.drawerLabelStyle,
                drawerActiveTintColor: colors.lightRed,
                drawerInactiveTintColor: colors.darkBlue
            }}
            backBehavior="history"
        >
            {/* Pantalla de inicio */}
            <Drawer.Screen 
                name="HomeScreen" 
                options={{ 
                    title: 'Inicio',
                    drawerIcon: ({ color, size }) => (
                        <Icon name="home-outline" color={ color } size={ size } />
                    )
                }} 
                component={ Home } 
            />

            {/* Pantalla de busqueda */}
            <Drawer.Screen 
                name="SearchScreen"
                options={{
                    title: 'Buscar',
                    drawerIcon: ({ color, size }) => (
                        <Icon name="search-outline" color={ color } size={ size } />
                    )
                }}
                component={ Search }
            />

            {/* Pantalla de creación de tareas */}
            <Drawer.Screen 
                name="CreateTaskScreen" 
                options={{ 
                    title: 'Crear Tarea',
                    drawerIcon: ({ color, size }) => (
                        <Icon name="reader-outline" color={ color } size={ size } />
                    )
                }} 
                component={ CreateTask } 
                initialParams={{ taskStatus: 'all' }}
            />

            {/* Pantalla de perfil */}
            <Drawer.Screen 
                name="ProfileScreen" 
                options={{ 
                    title: 'Perfil',
                    drawerIcon: ({ color, size }) => (
                        <Icon name="person-circle-outline" color={ color } size={ size } />
                    )
                }} 
                component={ Profile } 
            />      
        </Drawer.Navigator>
    );
}

/* Estilos del componente */
const styles = StyleSheet.create({
    drawerStyle: {
        backgroundColor: colors.light
    },

    drawerItemStyle: {
        backgroundColor: colors.lightGray,
        margin: 0,
        padding: 0,
    },

    drawerLabelStyle: {
        fontSize: 18,
        padding: 0,
        marginLeft: -20,
        margin: 0
    },
});

export default TasksNavigator;