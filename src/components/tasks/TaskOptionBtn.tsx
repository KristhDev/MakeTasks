import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

/* Theme */
import { colors } from '../../theme/app-theme';

/* Propiedades del componente */
interface Props {
    text: string;
    isAcitve: boolean;
    onPress: () => void;
}

/* Componente que muestra un boton de opción para filtrar las tareas */
export const TaskOptionBtn = ({ isAcitve, text, onPress, }: Props) => {
    return (
        <TouchableOpacity  
            activeOpacity={ 1 } 
            onPress={ onPress }
            style={
                /* Evaluación para mostrar como activo un boton */
                (isAcitve) 
                    ? { ...styles.taskOptionsBtnActive, ...styles.taskOptionsBtn } 
                    : styles.taskOptionsBtn 
                }
        >
            <Text 
                style={ 
                    /* Evaluación para mostrar como activo el texto del boton */
                    (isAcitve) 
                        ? { ...styles.taskOptionsText, ...styles.taskOptionsTextActive } 
                        : styles.taskOptionsText 
                }
            >
                { text }
            </Text>
        </TouchableOpacity>
    );
}

/* Estilos del componente */
const styles = StyleSheet.create({
    taskOptionsBtn: {
        borderRadius: 20,
        flex: 1
    },

    taskOptionsBtnActive: {
        backgroundColor: colors.lightMediumGray
    },

    taskOptionsText: {
        color: '#000',
        fontSize: 17,
        paddingVertical: 15,
        marginBottom: 2,
        textAlign: 'center'
    },

    taskOptionsTextActive: {
        fontWeight: 'bold'
    }
});