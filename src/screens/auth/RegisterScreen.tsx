import React from 'react';
import { View, StyleSheet, useWindowDimensions, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackScreenProps } from '@react-navigation/stack';

/* Layouts */
import AuthLayout from '../../layout/AuthLayout';

/* Components */
import { RegisterForm } from '../../components/auth/RegisterForm';

/* Hooks */
import useKeyboard from '../../hooks/useKeyboard';

/* Theme */
import { colors } from '../../theme/app-theme';

/* Propiedades de la pantalla */
interface Props extends StackScreenProps<any, any>{}

/* Pantalla para que el usuario realice el registro */
const RegisterScreen = ({ navigation }: Props) => {
    const { height, width } = useWindowDimensions();

    const { setKeyboardShow, keyboardShow } = useKeyboard();

    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            extraHeight={ 50 }
            overScrollMode="never"
            showsVerticalScrollIndicator={ false }
            contentContainerStyle={{ flexGrow: 1 }}
            onKeyboardDidShow={ () => setKeyboardShow(true) }
            onKeyboardDidHide={ () => setKeyboardShow(false) }
        >
            <AuthLayout
                title="Registrar"
                navigateBtnText="Ingresar"
                colorBtn={ colors.light }
                onPressNavigate={ () => navigation.navigate('LoginScreen') }
                style={{ 
                    flexGrow: 1,
                    minHeight: (height > width) 
                        ? '100%' 
                        : width * 0.725,
                    marginBottom: keyboardShow 
                        ? (height > width) 
                            ? (249 - (249 * 0.1)) : 392 * -0.35 
                        : 0 
                }}
            >
                { /* Formulario */ }
                <RegisterForm />

                { /* Fondo */ }
                <View 
                    style={{ 
                        ...styles.background,
                        width: (height > width) ? width * 2 : height * 2.8,
                        marginTop: height * 0.24,
                        height: (height > width) ? height * 0.9 : width * 0.75,
                        left: (height > width) ? -width * 0.3 : -height * 0.46,
                        bottom: (height > width) ? -height * 0.16 : -width * 0.15,
                    }}
                > 
                    { /* Fondo más pequeño */ }
                    <View style={ styles.backgroundBottom } />
                    <View 
                        style={{  
                            ...styles.backgroundBottom,
                            transform: [{ rotate: '-5deg' }],
                            bottom: -140,
                            left: 86,
                        }} 
                    />
                </View>
            </AuthLayout>
        </KeyboardAwareScrollView>
    );
}

/* Estilos de la pantalla */
const styles = StyleSheet.create({
    background: {
        backgroundColor: colors.lightBlue,
        borderTopLeftRadius: 999,
        borderTopRightRadius: 999,
        position: 'absolute',
    },

    backgroundBottom: {
        backgroundColor: colors.light,
        borderTopRightRadius: 999,
        bottom: -110,
        height: 320,
        position: 'absolute',
        left: -50,
        transform: [{ rotate: '-45deg' }],
        width: 400
    }
});

export default RegisterScreen