import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

/* Hooks */
import useTasks from '../../hooks/useTasks';

/* Interfaces */
import { TasksStatus } from '../../interfaces/tasks';

/* Theme */
import { colors } from '../../theme/app-theme';

/* Propiedades del componente */
interface Props {
    closeModal: () => void;
    taskStatus: TasksStatus;
}

/* Componente para mostrar el modal de confirmación de eliminación de tareas */
export const TaskDeleteModal = ({ closeModal, taskStatus }: Props) => {
    const { navigate } = useNavigation();
    const { removeTask, selectedTask } = useTasks();

    /* Función para eliminar la tarea seleccionada */
    const handleRemoveTask = async () => {
        const deleted = await removeTask(selectedTask.id, taskStatus);

        /* Si se eliminó la tarea, se redirige a la pantalla de inico */
        if (deleted) {
            closeModal();
            navigate('HomeScreen' as never);
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
            { /* Texto que corresponde a la acción a realizar */ }
            <View style={ styles.modalTitleContainer }>
                <Text style={ styles.modalTitle }>¿Estás seguro de eliminar está tarea?</Text>
            </View>

            { /* Botones del modal */ }
            <View style={ styles.modalBtnsContainer }>
                { /* Boton de cancelación */ }
                <TouchableHighlight 
                    activeOpacity={ 1 }
                    onPress={ closeModal }
                    style={ styles.modalBtn }
                    underlayColor={ colors.darkBlue }
                >
                    <Text style={ styles.modalBtnText }>Cancelar</Text>
                </TouchableHighlight>

                { /* Boton de confirmación */ }
                <TouchableHighlight 
                    activeOpacity={ 1 }
                    onPress={ handleRemoveTask }
                    style={ styles.modalBtn }
                    underlayColor={ colors.darkBlue }
                >
                    <Text style={ styles.modalBtnText }>Eliminar</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

/* Estilos del componente */
const styles = StyleSheet.create({
    modalTitleContainer: {
        marginTop: 20,
    },

    modalTitle: {
        color: colors.lightRed,
        fontSize: 16
    },

    modalBtnsContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },

    modalBtn: {
        backgroundColor: colors.lightBlue,
        borderRadius: 20,
        marginLeft: 10,
    },

    modalBtnText: {
        color: colors.light,
        fontSize: 17,
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginBottom: 1
    }
});