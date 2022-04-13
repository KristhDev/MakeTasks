import React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DrawerScreenProps } from '@react-navigation/drawer';

/* Layouts */
import TasksLayout from '../../layout/TasksLayout';

/* Components */
import { TaskForm } from '../../components/tasks/TaskForm';

/* Hooks */
import useKeyboard from '../../hooks/useKeyboard';
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
    const { setKeyboardShow, keyboardShow } = useKeyboard();
    const { selectedTask } = useTasks();

    const windowHeight = (height >= 720 && height > width) ? height : 720;

    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            extraHeight={ 50 }
            overScrollMode="never"
            showsVerticalScrollIndicator={ false }
            contentContainerStyle={{ flexGrow: 1 }}
            onKeyboardDidShow={ () => setKeyboardShow(true) }
            onKeyboardDidHide={ () => setKeyboardShow(false) }
        >
            <TasksLayout
                /* Evaluación para el título o nombre de la pantalla */
                title={ (selectedTask?.id) ? 'Editar Tarea' : 'Crear Tarea' }
                openDrawer={ () => navigation.openDrawer() }
                headerContainerStyle={{ backgroundColor: 'transparent' }}
                style={{ 
                    flexGrow: 1,
                    height: (height > width) 
                        ? (height >= 720 && height > width) ? undefined : 720 
                        : width * 0.8,
                    minHeight: (height > width) 
                        ? (height >= 720 && height > width) ? '100%' : 720 
                        : 392 * 0.65,
                    marginBottom: keyboardShow 
                        ? (height > width) 
                            ? (249 - (249 * 0.5)) : width * 0.015
                        : 0
                }}
            >
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
                        marginLeft: (height > width) ? width * -0.25 : width * 0.08,
                        marginTop: windowHeight * 0.4,
                        height: (height > width) ? windowHeight * 0.6 : windowHeight * 1.8
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