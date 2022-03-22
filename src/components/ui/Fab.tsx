import React from 'react';
import { StyleProp, StyleSheet, TouchableHighlight, TouchableHighlightProps, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/* Theme */
import { colors } from '../../theme/app-theme';

/* Propieades del componente */
interface Props {
    icon: string;
    onPress: () => void;
    iconSize?: number;
    isDisabled?: boolean;
    style?: StyleProp<ViewStyle>;
    buttonStyle?: StyleProp<TouchableHighlightProps['style']>;
    iconStyle?: StyleProp<ViewStyle>;
}

/* Componente para mostrar un Boton Flotante */
export const Fab = ({ onPress, icon, iconSize, isDisabled = false, style, buttonStyle, iconStyle }: Props) => {
    return (
        <View style={{ ...styles.fabContainer, ...style as any }}>
            <TouchableHighlight
                activeOpacity={ 1 }
                disabled={ isDisabled }
                onPress={ onPress }
                style={{  ...styles.fab, ...buttonStyle as any }}
                underlayColor={ colors.darkRed }
            >
                <Icon 
                    name={ icon }
                    size={ iconSize || 40 }
                    color={ colors.light }
                    style={{ marginLeft: 2, ...iconStyle as any }}
                />
            </TouchableHighlight>
        </View>
    );
}

/* Estilos del componente */
const styles = StyleSheet.create({
    fabContainer: {
        position: 'absolute',
        zIndex: 2
    },

    fab: {
        alignItems: 'center',
        backgroundColor: colors.lightRed,
        borderRadius: 20,
        justifyContent: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.30,
        shadowRadius: 6.25,
        height: 55,
        elevation: 7,
        width: 55
    }
});