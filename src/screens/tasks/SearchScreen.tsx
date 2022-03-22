import React, { useEffect, useState } from 'react'
import { View, StyleSheet, useWindowDimensions, Text, Keyboard } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';

/* Layouts */
import TasksLayout from '../../layout/TasksLayout';

/* Components */
import { TasksList } from '../../components/tasks/TasksList';
import { TasksLoader } from '../../components/tasks/TasksLoader';
import { SearchBar } from '../../components/ui/SearchBar';

/* Hooks */
import useTasks from '../../hooks/useTasks';

/* Theme */
import { colors } from '../../theme/app-theme';

/* Propiedades de la pantalla */
interface Props extends DrawerScreenProps<any, any>{}

/* Pantalla para realizar las busquedas de las tareas */
const SearchScreen = ({ navigation }: Props) => {
    const [ term, setTerm ] = useState<string>('');

    const { height, width } = useWindowDimensions();

    const { searchTasks, selectedTask, searchingTasks, isTasksLoading, removeSearchingTasks } = useTasks();

    /* Función para hacer la busqueda de tareas */
    const handleSearch = () => {
        Keyboard.dismiss();
        searchTasks(term);
    }

    /**
     * useEffect para limpiar la caja de busqueda y remover las 
     * tareas buscadas cuando se sale de la pantalla 
    */
    useEffect(() => {
        const unSubscribeBlur = navigation.addListener('blur', () => {
            setTimeout(() => {
                if (!selectedTask.id) {
                    removeSearchingTasks();
                    setTerm('');
                }
            }, 1000);
        });

        return unSubscribeBlur;
    }, [ navigation, selectedTask ]);

    return (
        <TasksLayout
            title="Buscar"
            openDrawer={ () => navigation.openDrawer() }
            headerContainerStyle={{
                borderBottomColor: colors.lightMediumGray,
                borderBottomWidth: 2,
                maxHeight: (height > width) ? height * 0.25 : height * 0.4,
            }}
        >
            <View style={{ ...styles.container }}>
                { /* Barra de busquedas */ }
                <SearchBar 
                    onSearchPress={ handleSearch }
                    onTextChange={ setTerm }
                    value={ term }
                    searchContainerStyle={{ position: 'absolute', top: (height > width) ? '-15%' : '-35%' }}
                />

                { /* Contenedor de taras de busquedas */ }
                <View style={{ flex: 1 }}>
                    {
                        /* Evaluar la carga y mostrarla, de lo contrario mostrar las tareas que hay */
                        isTasksLoading 
                            ? <TasksLoader />
                            : (searchingTasks.length > 0) 
                                ? <TasksList tasksType="searching" taskStatus="all" />
                                : <Text style={ styles.text }>No hay resultados</Text>
                    }
                </View>

                { /* Fondo */ }
                <View 
                    style={{ 
                        ...styles.tasksBackground,
                        height: (height > width) ? height * 0.70 : height,
                        left: (height > width) ? -width * 0.5 : -width * 0.2,
                        paddingTop: (height > width) ? height * 0.04 : width * 0.04,
                        width: (height > width) ? width * 2 : width * 1.4,
                        bottom: (height > width) ? 0 : -width * 0.3,
                    }}
                />
            </View>
        </TasksLayout>
    );
}

/* Estilos de la pantalla */
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        zIndex: 999
    },

    tasksBackground: {
        backgroundColor: colors.lightBlue,
        borderTopLeftRadius: 999,
        borderTopRightRadius: 999,
        position: 'absolute',
        flex: 1
    },

    text: {
        color: colors.light,
        fontSize: 25,
        marginTop: 120,
        zIndex: 2
    }
});

export default SearchScreen;