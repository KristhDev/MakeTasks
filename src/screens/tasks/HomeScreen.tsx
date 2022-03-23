import React, { useEffect, useState } from 'react'; 
import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import messaging from '@react-native-firebase/messaging';

/* Layouts */
import TasksLayout from '../../layout/TasksLayout';

/* Components */
import { TasksList } from '../../components/tasks/TasksList';
import { TasksLoader } from '../../components/tasks/TasksLoader';
import { TaskOptionBtn } from '../../components/tasks/TaskOptionBtn';
import { Fab } from '../../components/ui/Fab';

/* Hooks */
import useAuth from '../../hooks/useAuth';
import useTasks from '../../hooks/useTasks';

/* Interfaces */
import { TasksStatus } from '../../interfaces/tasks';

/* Theme */
import { colors } from '../../theme/app-theme';

type Option = 'all' | 'completed' | 'pending';

/* Propiedades de la pantalla */
interface Props extends DrawerScreenProps<any, any>{}

/* Pantalla de inicio para mostrar las tareas e interactuar con ellos */
const HomeScreen = ({ navigation }: Props) => {
    /* Primer state para filtrar las tareas */
    const [ optionActive, setOptionActive ] = useState({ all: true, completed: false, pending: false });
    const [ taskStatus, setTaskStatus ] = useState<TasksStatus>('all');

    const { height, width } = useWindowDimensions();

    const { isAuthenticated, user } = useAuth();
    const { loadTasks, loadSelectedTasks, isTasksLoading, selectedTasks } = useTasks();

    /* Función para filtrar las tareas */
    const handleSelectOption = (option: Option) => {
        setOptionActive({
            all: option === 'all' ? true : false,
            completed: option === 'completed' ? true : false,
            pending: option === 'pending' ? true : false
        });

        loadSelectedTasks(option);
        setTaskStatus(option);
    }

    

    /* useEffect para iniciar cargar de tareas */
    useEffect(() => {
        if (isAuthenticated) loadTasks();
    }, []);

    /* useEffect para escuchar los eventos de mensajeria de firebase */
    useEffect(() => {
        const foregroundSubscribe = messaging().onMessage(async () => {});
        const backgroundSubcribe = messaging().setBackgroundMessageHandler(async () => {});

        return () => {
            foregroundSubscribe();
            backgroundSubcribe;
        }
    }, [ ]);

    return (
        <TasksLayout
            title="Tareas"
            openDrawer={ () => navigation.openDrawer() }
            headerContainerStyle={{
                borderBottomWidth: (height > width) ? 0 : 2,
                borderBottomColor: colors.lightMediumGray,
                maxHeight: (height > width) ? height * 0.3 : width * 0.16
            }}
        >
            { /* Contenedor para mostrar el total de tareas */ }
            <View 
                style={{ 
                    ...styles.tasksTotal,
                    top: (height > width) ? 125 : 88, 
                }}
            >
                <Text style={  styles.tasksTotalText }>Total de tareas: { selectedTasks.length }</Text>
            </View>

            { /* Contenedor para los botones de opciones */ }
            <View 
                style={{ 
                    ...styles.tasksOptionsBackground, 
                    backgroundColor: (height > width) ? colors.light : 'transparent', 
                    borderBottomWidth: (height > width) ? 2 : 0, 
                    marginTop: (height > width) ? height * 0.215 : height * 0.3, 
                    top: (height > width) ? 0 : -height * 0.273,
                    right: (height > width) ? 0 : 70,
                    width: (height > width) ? width : width * 0.53,
                }}
            >
                { /* Boton para ir a la pantalla de edición de perfil */ }
                <TouchableOpacity 
                    style={ styles.tasksImageProfile }
                    activeOpacity={ 0.8 }
                    onPress={ () => navigation.navigate('ProfileScreen') }
                >
                    <Image 
                        source={ 
                            (user.image) 
                                ? { uri: user.image }
                                : require('../../assets/default-user.jpg')
                        }
                        style={{ height: 55, width: 55 }}
                    />
                </TouchableOpacity>

                { /* Botones de opciones */ }
                <View 
                    style={{ 
                        ...styles.tasksOptions,
                        width: (height > width) ? width * 0.75 : 320,
                    }}
                >
                    <TaskOptionBtn 
                        text="Todas"
                        isAcitve={ optionActive.all }
                        onPress={ () => handleSelectOption('all') }
                    />

                    <TaskOptionBtn
                        text="Completas"
                        isAcitve={ optionActive.completed }
                        onPress={ () => handleSelectOption('completed') }
                    />

                    <TaskOptionBtn
                        text="Pendientes"
                        isAcitve={ optionActive.pending }
                        onPress={ () => handleSelectOption('pending') }
                    />
                </View>
            </View>

            { /* Boton para ir a crear una tarea */ }
            <Fab 
                onPress={ () => navigation.navigate('CreateTaskScreen', { taskStatus }) }
                icon="add-circle-outline"
                style={{ right: 20, bottom: 90 }}
            />

            { /* Boton para ir a buscar tareas */ }
            <Fab 
                onPress={ () => navigation.navigate('SearchScreen') }
                icon="search-outline"
                style={{ right: 20, bottom: 20 }}
            />

            {
                /* Evaluación para mostrar la carga o la lista de tareas */
                isTasksLoading 
                    ? <TasksLoader />
                    : <TasksList tasksType="default" taskStatus={ taskStatus } />
            }

            { /* Fondo */ }
            <View 
                style={{ 
                    ...styles.tasksBackground,
                    height: (height > width) ? height * 0.65 : height * 2,
                    left: (height > width) ? -width * 0.5 : -width * 0.6,
                    paddingTop: (height > width) ? height * 0.04 : width * 0.04,
                    width: (height > width) ? width * 2 : width * 2.2,
                    bottom: (height > width) ? 0 : -height * 1.4,
                }}
            />
        </TasksLayout>
    );
}

/* Estilos de la pantalla */
const styles = StyleSheet.create({
    tasksBackground: {
        backgroundColor: colors.lightBlue,
        borderTopLeftRadius: 999,
        borderTopRightRadius: 999,
        position: 'absolute',
        flex: 1
    },

    tasksTotal: {
        right: 50,
        position: 'absolute',
        zIndex: 2
    },

    tasksTotalText: {
        color: '#000',
        fontSize: 16
    },

    tasksOptionsBackground: {
        alignItems: 'center',
        borderBottomColor: colors.lightMediumGray,
        flexDirection: 'row',
        paddingBottom: 20, 
        position: 'absolute', 
        zIndex: 3
    },

    tasksImageProfile: {
        alignItems: 'center',
        backgroundColor: colors.light,
        borderRadius: 999, 
        borderColor: colors.light,
        borderWidth: 4,
        elevation: 6,
        height: 55, 
        justifyContent: 'center', 
        marginLeft: 16.5, 
        overflow: 'hidden', 
        shadowColor: '#000',
        shadowOffset: {
            height: 5,
            width: 0,
        },
        shadowOpacity: 0.30,
        shadowRadius: 6.25,
        width: 55
    },

    tasksOptions: {
        backgroundColor: colors.lightGray,
        borderRadius: 20,
        flexDirection: 'row',
        overflow: 'hidden',
        justifyContent: 'center',
        marginLeft: 10,
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.30,
        shadowRadius: 6.25,
        elevation: 7
    }
});

export default HomeScreen;