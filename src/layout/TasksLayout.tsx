import React, { FC } from 'react';
import { StyleProp, StyleSheet, TouchableHighlight, useWindowDimensions, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/* Components */
import { ScreenTitle } from '../components/ui/ScreenTitle';

/* Theme */
import { colors } from '../theme/app-theme';

/* Propiedades del componente */
interface Props {
    title: string;
    openDrawer: () => void;
    headerContainerStyle?: StyleProp<ViewStyle>;
}

/**
 * Layout de que se muestra en todas las pantallas 
 * relacionadas con tareas 
*/
const TasksLayout: FC<Props> = ({ children, title, openDrawer, headerContainerStyle }) => {
    const { height, width } = useWindowDimensions();

    return (
        <View style={{ flex: 1, height: (height > width) ? height : width * 0.8 }}>
            <View 
                style={{ 
                    ...styles.headerContainer, 
                    maxHeight: (height > width) ? height * 0.3 : width * 0.2,
                    ...headerContainerStyle as ViewStyle
                }}
            >
                { /* Titulo o nombre de la pantalla */ }
                <ScreenTitle 
                    title={ title }
                    /* Evaluación para aplicar estilo de vertical u horizontal */
                    styleTitleContainer={{ 
                        top: (height > width) ? -120 : -170
                    }}
                    styleTitleText={{
                        top: (height > width) ? 120 : 160
                    }}
                />

                { /* Botón para abrir el menu */ }
                <View style={ styles.btnGoToContainer }>
                    <TouchableHighlight
                        activeOpacity={ 1 }
                        underlayColor={ colors.lightMediumGray }
                        onPress={ openDrawer }
                        style={ styles.btnGoTo }
                    >
                        <Icon 
                            name="menu-outline"
                            size={ 40 }
                            color={ colors.lightRed }
                            style={ styles.btnGoToIcon }
                        />
                    </TouchableHighlight>
                </View>
            </View>

            { /* Contenido de la pantalla */ }
            { children }
        </View>
    );
}

/* Estilos del layout */
const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: colors.light,
        flex: 1,
        zIndex: 2 
    },

    btnGoToContainer: {
        position: 'absolute',
        right: 15,
        top: 15
    },

    btnGoTo: {
        backgroundColor: colors.lightGray,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.30,
        shadowRadius: 6.25,
        elevation: 7,
        zIndex: 998
    },

    btnGoToIcon: {
        padding: 2,
        marginLeft: 3
    }
});

export default TasksLayout;