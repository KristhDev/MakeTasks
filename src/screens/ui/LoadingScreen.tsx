import React from 'react';
import { ActivityIndicator, StyleSheet, useWindowDimensions, View } from 'react-native';
import { ScreenTitle } from '../../components/ui/ScreenTitle';

/* Theme */
import { colors } from '../../theme/app-theme';

/* Pantalla para mostrar un indicador de carga */
const LoadingScreen = () => {
    const { height, width } = useWindowDimensions();

    return (
        <>
            { /* Titulo */ }
            <ScreenTitle 
                title="" 
                styleTitleContainer={{
                    top: (height > width) ? -120 : -150,
                }}
            />

            { /* Spinner de carga */ }
            <ActivityIndicator 
                size={ 80 }
                color={ colors.textGray }
                style={{ top: height / 2 - 80, zIndex: 999 }}
            />

            { /* Fondo */ }
            <View 
                style={{ 
                    ...styles.backgroundBotom,
                    bottom: -120,
                    right: -50, 
                }} 
            />
        </>
    );
}

/* Estilos de la pantalla */
const styles = StyleSheet.create({
    backgroundBotom: {
        backgroundColor: colors.lightBlue,
        position: 'absolute',
        width: 400,
        height: 400,
        borderTopLeftRadius: 400,
        transform: [{ rotate: '25deg' }],
    }
});

export default LoadingScreen;