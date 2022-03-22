import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

/* Theme */
import { colors } from '../../theme/app-theme';

/* Propiedades del componente */
interface Props {
    msgStatus: string;
    onClose: () => void;
}

/** 
 * Componente para mostrar el modal de los estados de la app, tanto 
 * errores como mensajes de exito 
*/
export const ModalStatus = ({ msgStatus, onClose }: Props) => {
    return (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
            { /* Contenedor del mensaje del modal */ }
            <View style={ styles.modalStatusContent }>
                <Text style={ styles.modalStatusContentText }>{ msgStatus }</Text>
            </View>

            { /* Contenedor de lo botones del modal */ }
            <View style={ styles.modalStatusActions }>
                <TouchableHighlight 
                    activeOpacity={ 1 } 
                    onPress={ onClose } 
                    style={ styles.modalStatusBtn }
                    underlayColor={ colors.darkBlue }
                >
                    <Text style={ styles.modalStatusBtnText }>Está bien</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

/* Estilos del componente */
const styles = StyleSheet.create({
    modalStatusContent: {
        marginTop: 10,
        padding: 5
    },

    modalStatusContentText: {
        color: colors.lightRed,
        fontSize: 16
    },

    modalStatusActions: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },

    modalStatusBtn: {
        backgroundColor: colors.lightBlue,
        borderRadius: 20,
    },

    modalStatusBtnText: {
        color: colors.light,
        fontSize: 17,
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginBottom: 1
    }
});