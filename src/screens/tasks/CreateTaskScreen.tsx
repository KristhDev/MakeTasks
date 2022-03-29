import React, { useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DrawerScreenProps } from '@react-navigation/drawer';

/* Layouts */
import TasksLayout from '../../layout/TasksLayout';

/* Components */
import { TaskForm } from '../../components/tasks/TaskForm';

/* Hooks */
import useTasks from '../../hooks/useTasks';

/* Navigators params */
import { TasksNavigatorParams } from '../../navigation/TasksNavigator';

/* Theme */
import { colors } from '../../theme/app-theme';

/* Propieades de la pantalla */
interface Props extends DrawerScreenProps<TasksNavigatorParams, 'CreateTaskScreen'>{}

/* Pantalla para poder crear o editar una tarea */
const CreateTaskScreen = ({ route, navigation }: Props) => {
    /* Extrayendo parametro */
    const { taskStatus } = route.params;

    const { width, height } = useWindowDimensions();
    const [ keyboardShow, setKeyboardShow ] = useState(false);
    const { selectedTask } = useTasks();

    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            extraHeight={ 50 }
            overScrollMode="never"
            showsVerticalScrollIndicator={ false }
            contentContainerStyle={{ flexGrow: (!keyboardShow) ? 1 : 0 }}
            onKeyboardDidShow={ () => setKeyboardShow(true) }
            onKeyboardDidHide={ () => setKeyboardShow(false) }
        >
            <TasksLayout
                /* Evaluación para el título o nombre de la pantalla */
                title={ (selectedTask?.id) ? 'Editar Tarea' : 'Crear Tarea' }
                openDrawer={ () => navigation.openDrawer() }
                headerContainerStyle={{ backgroundColor: 'transparent' }}
                style={{ height: (height > width) ? undefined : width * 0.8 }}
            >

                { /* Espaciador para cuando se abre el teclado */ }
                <View 
                    style={{ 
                        height: (keyboardShow) 
                            ? (height > width) ? height * 0.1615 : 0
                            : 0 
                    }} 
                />

                { /* Contenedor del formulario */ }
                <View style={ styles.formContainer }>

                    { /* Formulario */ }
                    <TaskForm 
                        taskStatus={ taskStatus } 
                        navigation={ navigation } 
                    />
                </View>

                { /* Fondo */ }
                <View 
                    style={{ 
                        ...styles.background,
                        width: (height > width) ? width * 2 : width * 1.6,
                        marginLeft: (height > width) ? width * -0.25 : width * 0.05,
                        marginTop: height * 0.4,
                        height: (height > width) ? height * 0.6 : height * 1.6
                    }}
                >
                    { /* Fondo más pequeño */ }
                    <View style={ styles.backgroundBottom } />
                </View>
            </TasksLayout>
        </KeyboardAwareScrollView>
    );
}

/* Estilos de la pantalla */
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.lightBlue,
        bottom: -38,
        left: -38,
        borderTopLeftRadius: 999,
        borderTopRightRadius: 999,
        transform: [{ rotate: '-50deg' }],
        position: 'absolute'
    },

    backgroundBottom: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderTopRightRadius: 999,
        backgroundColor: colors.light,
        transform: [{ rotate: '30deg' }],
        bottom: 100,
        left: -50
    },

    formContainer: {
        alignItems: 'center',
        marginHorizontal: 5,
        zIndex: 2
    }
});

export default CreateTaskScreen;