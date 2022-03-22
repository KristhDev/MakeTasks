import React from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';

/* Components */
import { TaskItem } from './TaskItem';

/* Hooks */
import useTasks from '../../hooks/useTasks';

/* Interfaces */
import { TasksStatus } from '../../interfaces/tasks';

/* Propiedades del componente */
interface Props {
    taskStatus: TasksStatus;
    tasksType: 'default' | 'searching';
}

/**
 * Componente que muestra la lista de tareas en donde se coloque,
 * muestra tanto las tareas(todas, completas e incompletas) y las buscadas
 */
export const TasksList = ({ taskStatus, tasksType }: Props) => {
    const { width, height } = useWindowDimensions();

    const { selectedTasks, searchingTasks } = useTasks();

    /**  
     * Objeto que contiene los tipos de tareas que seran selccionadas
     * por la propiedad tasksType 
     */
    const tasks = {
        default: selectedTasks,
        searching: searchingTasks
    }

    return (
        <ScrollView 
            style={{ ...styles.taskScrollView, width }} 
            showsVerticalScrollIndicator={ false }
        >
            <View style={{ ...styles.tasksLists, width, paddingRight: 1.2 }}>
                {/* Espaciador */}
                <View style={{ marginTop: height * 0.14 }} />

                {
                    tasks[tasksType].map((task) => 
                        // Componente para mostrar tarea 
                        <TaskItem 
                            key={ task.id } 
                            task={ task } 
                            taskStatus={ taskStatus } 
                        />
                    )
                }
            </View>
        </ScrollView>
    );
}

/* Estilos del componente */
const styles = StyleSheet.create({
    taskScrollView: {
        flex: 1,
        zIndex: 1
    },

    tasksLists: {
        alignItems: 'center', 
        flex: 1,
        zIndex: 1 
    }
});