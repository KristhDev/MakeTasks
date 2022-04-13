import React from 'react';
import { StyleSheet, Text, TouchableHighlight, useWindowDimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/Ionicons';

/* Hooks */
import useTasks from '../../hooks/useTasks';

/* Interfaces */
import { Task, TasksStatus } from '../../interfaces/tasks';

/* Theme */
import { colors } from '../../theme/app-theme';

/* Propiedades del componente */
interface Props {
    task: Task;
    taskStatus: TasksStatus;
}

/* Componente para mostrar cada Item de la lista de tareas */
export const TaskItem = ({ task, taskStatus }: Props) => {
    const { navigate } = useNavigation();
    const { width } = useWindowDimensions();

    const { setSelectedTask, toggleTaskCompeted } = useTasks();

    /**  
     * Función para seleccionar una tarea y navegar a la pantalla 
     * de edición de tareas.
    */
    const handleGoToEditTask = () => {
        setSelectedTask(task);

        navigate(
            'CreateTaskScreen' as never, 
            { title: 'Editar Tarea', taskStatus } as never
        );
    }

    /* Función para marcar como completa e imcompleta una tarea */
    const handleToggleTask = () => toggleTaskCompeted(task, taskStatus);

    return (
        <View style={ styles.task }>

            { /* Contenedor del titulo de la tarea */ }
            <View style={ styles.taskTitleContainer }>

                { /* Boton para ir a la edición de la tarea */ }
                <TouchableHighlight 
                    activeOpacity={ 1 }
                    onPress={ handleGoToEditTask }
                    style={{ 
                        ...styles.taskTitleBox,
                        height: (width > 320) ? 60 : 50,
                        width: (width > 320) ? 60 : 50
                    }} 
                    underlayColor={ colors.darkRed }
                >
                    <Icon 
                        name="pencil-outline"
                        size={ (width > 320) ? 30 : 25 }
                        color={ colors.light }
                    />
                </TouchableHighlight>

                { /* Titulo de la tarea */ }
                <Text 
                    style={{ 
                        ...styles.taskTitle,
                        fontSize: (width > 320) ? 20 : 17,
                    }}
                >
                    { (task.title.length > 17) ? task.title.slice(0, 17) + '...' : task.title }
                </Text>

                { /* Boton para marcar como completa o incompleta una tarea */ }
                <TouchableHighlight
                    activeOpacity={ 1 }
                    style={{
                        /* Evaluación para aplicación de estilos */
                        ...styles.taskStatus,
                        backgroundColor: (task.completed) ? 'green' : 'red'
                    }}
                    onPress={ handleToggleTask }
                    underlayColor={ (task.completed) ? 'darkgreen' : 'darkred' }
                >
                    <Icon 
                        name={ task.completed ? 'checkmark-circle-outline' : 'close-circle-outline' }
                        color={ colors.light }
                        size={ 30 }
                        style={{ marginLeft: 2 }}
                    />
                </TouchableHighlight>
            </View>

            { /* Cuerpo de la tarea */ }
            <View style={ styles.taskBodyContainer }>

                { /* Texto del cuerpo de la tarea */ }
                <Text style={ styles.taskBody }>
                    { (task.body.length > 120) ? task.body.slice(0, 120) + '...' : task.body }
                </Text>

                { /* Contenedor de fechas de la tarea */ }
                <View style={ styles.taskDates }>

                    { /* Fecha de finalización de la tarea */ }
                    <Text 
                        style={{ 
                            ...styles.taskDate, 
                            color: (task.completed) ? 'green' : colors.lightRed,
                            fontWeight: 'bold'
                        }}
                    >
                        {
                            (task.completed)
                                ? 'Entregada'
                                : `Entregar el ${ dayjs(task.finalDate).format('DD/MM/YYYY') }`
                        }
                    </Text>

                    { /* Fecha de creación de la tarea */ }
                    <Text style={{ ...styles.taskDate, color: colors.darkBlue }}>{ dayjs(task.createdAt).format('DD/MM/YYYY') }</Text>
                </View>
            </View>
        </View>
    );
}

/* Estilos del componente */
const styles = StyleSheet.create({
    task: {
        backgroundColor: colors.lightGray,
        borderRadius: 20,
        marginBottom: 45,
        overflow: 'hidden',
        width: '88%',
        shadowColor: 'rgba(0, 0, 0, 0.8)',
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.30,
        shadowRadius: 6.25,
        elevation: 7
    },

    taskTitleContainer: {
        flex: 1,
        backgroundColor: colors.light,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.30,
        shadowRadius: 6.25,
        elevation: 5,
        zIndex: 1
    },

    taskTitleBox: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.lightRed,
        borderRadius: 20
    },

    taskTitle: {
        color: colors.darkBlue,
        fontWeight: 'bold',
        flex: 1,
        marginLeft: 20,
    },

    taskStatus: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 999,
        width: 40,
        height: 40,
        marginRight: 12
    },

    taskBodyContainer: {
        backgroundColor: colors.lightGray,
    },

    taskBody: {
        color: '#000',
        textAlign: 'justify',
        padding: 15,
    },

    taskDates: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    taskDate: {
        paddingTop: 5,
        padding: 10,
    }
});