import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

/* Theme */
import { colors } from '../../theme/app-theme';

/* Propiedades del componente */
interface Props {
    text: string;
    onPress: () => void;
    isDisabled?: boolean;
}

/* Componente para mostrar el boton de los formularios */
export const FormBtn = ({ text, onPress, isDisabled = false }: Props) => {
    return (
        <TouchableHighlight 
            activeOpacity={ 1 }
            disabled={ isDisabled }
            onPress={ onPress } 
            style={ styles.btnSubmit }
            underlayColor={ colors.darkRed }
        >
            <Text style={ styles.btnSubmitText }>{ text }</Text>
        </TouchableHighlight>
    );
}

/* Estilos del componente */
const styles = StyleSheet.create({
    btnSubmit: {
        backgroundColor: colors.lightRed,
        borderRadius: 50
    },

    btnSubmitText: {
        color: colors.light,
        fontSize: 20,
        marginBottom: 2,
        paddingVertical: 8,
        paddingHorizontal: 25
    },
});