import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackScreenProps } from '@react-navigation/stack';

/* Layouts */
import AuthLayout from '../../layout/AuthLayout';

/* Components */
import { LoginForm } from '../../components/auth/LoginForm';

/* Theme */
import { colors } from '../../theme/app-theme';

/* Propiedades de la pantalla */
interface Props extends StackScreenProps<any, any>{}

/* Pantalla para que el usuario realice la autenticación */
const LoginScreen = ({ navigation }: Props) => {
    const { height, width } = useWindowDimensions();

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={ false }
            extraHeight={ 50 }
            enableOnAndroid
        >
            <AuthLayout
                title="Ingresar"
                navigateBtnText="Crear cuenta"
                colorBtn={ colors.lightRed }
                onPressNavigate={ () => navigation.navigate('RegisterScreen') }
                landscapeHeight={ 0.65 }
            >
                { /* Formulario */ }
                <LoginForm />

                { /* Fondo */ }
                <View 
                    style={{ 
                        ...styles.background,
                        height: (height > width) ? height * 0.75 : width * 0.60,
                        left: (height > width) ? -width * 0.95 : -height * 0.40,	
                        width: (height > width) ? width * 2.3 : height * 2.5,
                        bottom: (height > width) ? -height * 0.10 : -width * 0.10,
                    }}
                >
                    { /* Fondo más pequeño */ }
                    <View 
                        style={{
                            ...styles.backgroundBottom, 
                            right: (height > width) ? 110 : 40,
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
        position: 'absolute'
    },

    backgroundBottom: {
        backgroundColor: colors.light,
        borderTopLeftRadius: 999,
        bottom: -110,
        height: 320,
        position: 'absolute',
        transform: [{ rotate: '30deg' }],
        width: 320
    }
});

export default LoginScreen