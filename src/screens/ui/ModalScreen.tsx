import React, { FC } from 'react';
import { Modal, StyleSheet, Text, View, ScrollView } from 'react-native';

/* Theme */
import { colors } from '../../theme/app-theme';

/* Propiedades de la pantalla */
interface Props {
    isVisible: boolean;
    modalOpacity?: number
}

/* Pantalla para mostrar todos los modales de la aplicación */
const ModalScreen: FC<Props> = ({ isVisible, modalOpacity = 0.5, children }) => {
    return (
        <Modal
            animationType="fade"
            transparent={ true }
            visible={ isVisible }
        >
            <View 
                style={{  
                    ...styles.container,
                    backgroundColor: `rgba(0, 0, 0, ${ modalOpacity })`,
                }}
            >

                { /* Caja del modal */ }
                <View style={ styles.modal }>

                    { /* Fondo pequeño superior */ }
                    <View style={ styles.modalBackgroundTop } />

                    { /* Título del modal */ }
                    <View>
                        <Text style={ styles.modalTitleText }>MakeTasks</Text>
                    </View>

                    { /* Contenido del modal */ }
                    <ScrollView>
                        { children }
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

/* Estilos de la pantalla */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    modal: {
        backgroundColor: colors.light,
        borderRadius: 20,
        padding: 15,
        overflow: 'hidden',
        width: '75%'
    },

    modalBackgroundTop: {
        backgroundColor: colors.lightRed,
        borderBottomLeftRadius: 100,
        height: 100,
        position: 'absolute',
        right: 0,
        top: -30,
        transform: [{ rotate: '-25deg' }],
        width: 100,
    },

    modalTitleText: {
        color: colors.darkBlue,
        fontSize: 19
    },
});

export default ModalScreen;