import React, { FC } from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View, ViewStyle } from 'react-native';

/* Components */
import { ScreenTitle } from '../components/ui/ScreenTitle';

/* Propiedades del Layout */
interface Props {
    title: string;
    navigateBtnText: string;
    colorBtn: string;
    onPressNavigate: () => void;
    style?: StyleProp<ViewStyle>;
}

/* HOC para la Autenticación */
const AuthLayout: FC<Props> = ({ title, onPressNavigate, navigateBtnText, colorBtn, style, children }) => {
    const { height, width } = useWindowDimensions();

    return (
        <View 
            style={{ 
                flex: 1,
                ...style as ViewStyle 
            }}
        >
            { /* Titulo o nombre de la screen */ }
            <ScreenTitle 
                title={ title }
                styleTitleContainer={{ 
                    top: (height > width) ? -120 : -150,
                    width: (height > width) ? width * 0.8 : 400
                }}
                styleTitleText={{
                    top: (height > width) ? 120 : 150,
                }}
            />

            { /* Boton de la esquina inferior derecha para navegar */ }
            <View style={ styles.btnGoToContainer }>
                <TouchableOpacity 
                    activeOpacity={ 0.75 }
                    onPress={ onPressNavigate }
                >
                    <Text style={{ color: colorBtn, fontSize: 16 }}>{ navigateBtnText }</Text>
                </TouchableOpacity>
            </View>

            { /* Contenido de la pantalla */ }
            { children }
        </View>
    );
}

/* Estilos del Layout */
const styles = StyleSheet.create({
    btnGoToContainer: {
        position: 'absolute',
        right: 25,
        bottom: 20,
        zIndex: 999
    }
});

export default AuthLayout;