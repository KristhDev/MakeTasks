import React, { useEffect } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { object, string } from 'yup';

/* Components */
import { FormBtn } from '../ui/FormBtn';
import { FormGroup } from '../ui/FormGroup';

/* Hooks */
import useAuth from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';
import useStatus from '../../hooks/useStatus';

/* Esquema de validación de los campos del formulario de Login */
const loginFormSchema = object().shape({
    email: string()
        .required('El correo es requerido')
        .email('Por favor escriba su correo correctamente'),
    password: string()
        .required('La contraseña es requerida')
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
});

/** 
 * Componente para mostrar el formulario de Login y realizar 
 * la autenticación del usuario
*/
export const LoginForm = () => {
    const { height, width } = useWindowDimensions();
    const navigation = useNavigation();

    const { signIn } = useAuth();
    const { setMsgError } = useStatus();
    const { form, onChangeField, resetForm } = useForm({ email: '', password: '' });

    /* Función para realizar la autenticación */
    const handleSubmit = async () => {
        try {
            await loginFormSchema.validate(form);
            signIn(form.email, form.password);
        } 
        catch (error: any) {
            const values = Object.values(error.errors) as string[];
            setMsgError(values[0]);
        }
    }

    /* useEffect para resetear el formulario al cambiar de pantalla */
    useEffect(() => {
        const unSubscribe = navigation.addListener('blur', () => {
            resetForm();
        });

        return unSubscribe;
    }, [ navigation ]);

    return (
        <View   
            style={{ 
                ...styles.formContainer, 
                marginTop: (height > width) ? height * 0.44 : height * 0.32,
                maxHeight: height * 0.56,
                minHeight: height * 0.56
            }}
        >
            { /* Campo de Correo */ }
            <FormGroup 
                icon="mail-outline"
                inputValue={ form.email }
                label="Correo:"
                onChangeText={ (text) => onChangeField(text, 'email') }
                placeholder="Ingresa tu correo"
                type="emailAddress"
                keyboardType="email-address"
            />

            { /* Campo de Contraseña */ }
            <FormGroup
                icon="key-outline"
                inputValue={ form.password }
                label="Contraseña:"
                onChangeText={ (text) => onChangeField(text, 'password') }
                placeholder="Ingresa tu contraseña"
                type="password"
            />

            { /* Espaciador */ }
            <View style={{ marginTop: 55 }} />

            { /* Botón de inicio de sesión */ }
            <FormBtn 
                text="Iniciar sesión"
                onPress={ handleSubmit }
            />
        </View>
    );
}

/* Estilos del componente */
const styles = StyleSheet.create({
    formContainer: {
        alignItems: 'center',
        flex: 1,
        zIndex: 3
    }
});