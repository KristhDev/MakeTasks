import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

/* Theme */
import { colors } from '../../theme/app-theme';

/* Propiedades del componente */
interface Props {
    title: string;
    styleTitleContainer?: StyleProp<ViewStyle>;
    styleTitleText?: StyleProp<TextStyle>
}

/* Componente que muestra el título de la pantalla */
export const ScreenTitle = ({ title, styleTitleContainer, styleTitleText }: Props) => {
    return (
        <View style={{ ...styles.screenTitle, ...styleTitleContainer as any }}>
            <Text style={{ ...styles.screenTitleText, ...styleTitleText as any }}>{ title }</Text>
        </View>
    );
}

/* Estilos del componente */
const styles = StyleSheet.create({
    screenTitle: {
        width: 350,
        height: 300,
        transform: [{ rotate: '20deg' }],
        top: -120,
        left: -20,
        borderBottomEndRadius: 999,
        backgroundColor: colors.lightRed,
        position: 'absolute',
        zIndex: 888,
    },

    screenTitleText: {
        color: colors.light,
        fontSize: 40,
        fontWeight: 'bold',
        transform: [{ rotate: '-20deg' }],
        top: 120,
        left: 50
    }
});