import React from 'react';
import { View, ActivityIndicator, StyleSheet, useWindowDimensions } from 'react-native';

/* Theme */
import { colors } from '../../theme/app-theme';

/* Componente para mostrar una carga de datos, en este caso tareas */
export const TasksLoader = () => {
    const { height, width } = useWindowDimensions();

    return (
        <View 
            style={{ 
                ...styles.tasksLoader,
                /* Evaluar si es modo horizontal o vertical */
                marginBottom: (height > width) ? 200 : 0 
            }}
        >
            { /* Spiner de carga */ }
            <ActivityIndicator 
                color={ colors.light }
                size={ 60 }
            />
        </View>
    );
}

/* Estilos del componente */
const styles = StyleSheet.create({
    tasksLoader: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        zIndex: 1
    }
});