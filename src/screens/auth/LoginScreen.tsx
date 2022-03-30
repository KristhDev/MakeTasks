import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackScreenProps } from '@react-navigation/stack';

/* Layouts */
import AuthLayout from '../../layout/AuthLayout';

/* Components */
import { LoginForm } from '../../components/auth/LoginForm';

/* Hooks */
import useKeyboard from '../../hooks/useKeyboard';

/* Theme */
import { colors } from '../../theme/app-theme';

/* Propiedades de la pantalla */
interface Props extends StackScreenProps<any, any>{}

/* Pantalla para que el usuario realice la autenticación */
const LoginScreen = ({ navigation }: Props) => {
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
                title="Ingresar"
                navigateBtnText="Crear cuenta"
                colorBtn={ colors.lightRed }
                onPressNavigate={ () => navigation.navigate('RegisterScreen') }
                style={{ 
                    flexGrow: 1,
                    minHeight: (height > width) 
                        ? '100%' 
                        : width * 0.65,
                    marginBottom: keyboardShow 
                        ? (height > width) 
                            ? (249 + (249 * 0.2)) : 392 * -0.25 
                        : 0 
                }}
            >   
                { /* Formulario */ }
                <LoginForm />

                { /* Fondo */ }
                <View 
                    style={{ 
                        ...styles.background,
                        height: (height > width) ? height * 0.75 : width * 0.7,
                        left: (height > width) ? -width * 0.95 : -height * 0.40,	
                        width: (height > width) ? width * 2.3 : height * 2.6,
                        bottom: (height > width) ? -height * 0.10 : -width * 0.2,
                    }}
                >
                    { /* Fondo más pequeño */ }
                    <View 
                        style={{
                            ...styles.backgroundBottom, 
                            right: (height > width) ? 110 : 40,
                            bottom: (height > width) ? -130 : -70
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
        zIndex: -1
    },

    backgroundBottom: {
        backgroundColor: colors.light,
        borderTopLeftRadius: 999,
        height: 360,
        position: 'absolute',
        transform: [{ rotate: '30deg' }],
        width: 360,
        zIndex: -1
    }
});

export default LoginScreen