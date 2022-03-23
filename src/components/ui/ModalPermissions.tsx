import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

/* Theme */
import { colors } from '../../theme/app-theme';

/* Propiedades del componente */
interface Props {
    title: string;
    onPress: () => void;
    onCancel: () => void;
}

/* Componente para mostrar el contenido del modal de los permisos */
export const ModalPermissions = ({ title, onPress, onCancel }: Props) => {
    return (
        <View style={ styles.modalPermissionsContainer }>

            { /* Título o mensaje acerca de los permisos */ }
            <View style={ styles.modalPermissionsInfoContainer }>
                <Text style={ styles.modalPermissionsInfo }>{ title }</Text>
            </View>

            { /* Botón para aceptar los permisos */ }
            <View style={ styles.modalPermissionsActions }>

                { /* Botón para cancelar los permisos */ }
                <TouchableHighlight 
                    activeOpacity={ 1 }
                    onPress={ onCancel }
                    style={{ 
                        ...styles.modalPermissionsBtn,
                        marginRight: 10,
                    }} 
                    underlayColor={ colors.darkBlue } 
                    >
                    <Text style={ styles.modalPermissionsBtnText }>Cancelar</Text>
                </TouchableHighlight>

                { /* Botón para aceptar los permisos */ }
                <TouchableHighlight 
                    activeOpacity={ 1 }
                    onPress={ onPress }
                    style={ styles.modalPermissionsBtn } 
                    underlayColor={ colors.darkBlue } 
                >
                    <Text style={ styles.modalPermissionsBtnText }>Dar permiso</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

/* Estilos del componente */
const styles = StyleSheet.create({
    modalPermissionsContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },

    modalPermissionsInfoContainer: {
        marginTop: 10,
        padding: 5
    },

    modalPermissionsInfo: {
        color: colors.lightRed,
        fontSize: 16,  
    },

    modalPermissionsActions: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },

    modalPermissionsBtn: {  
        backgroundColor: colors.lightBlue,
        borderRadius: 20
    },

    modalPermissionsBtnText: {
        color: colors.light,
        fontSize: 17,
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginBottom: 1
    }
});