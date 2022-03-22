import React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { object, string } from 'yup';

/* Components */
import { FormBtn } from '../ui/FormBtn';
import { FormGroup } from '../ui/FormGroup';

/* Hooks */
import useAuth from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';
import useStatus from '../../hooks/useStatus';

/* Esquema de validación de los campos del formulario de Register */
const registerFormSchema = object().shape({
    name: string()
        .required('El nombre es requerido'),
    email: string()
        .required('El correo es requerido')
        .email('Por favor escriba su correo correctamente'),
    password: string()
        .required('La contraseña es requerida')
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
});

/** 
 * Componente para mostrar el formulario de Register y realizar
 * tanto registro como autenticación del usuario 
 */
export const RegisterForm = () => {
    const { height, width } = useWindowDimensions();

    const { signUp } = useAuth();
    const { setMsgError } = useStatus();
    const { form, onChangeField} = useForm({ name: '', email: '', password: '' });

    /** 
     * Función para realizar el registro y autenticación.
     * En este caso no es necesario realizar reseteo del formulario porque el 
     * regresar al login o autenticarse se resetea el estado del componente,
     * no sucede lo mismo en LoginForm poque ese se muestra en la primera pantalla 
     */
    const handleSubmit = async () => {
        try {
            await registerFormSchema.validate(form);
            signUp({ ...form });
        } 
        catch (error: any) {
            const values = Object.values(error.errors) as string[];
            setMsgError(values[0]);
        }
    }

    return (
        <View 
            style={{ 
                ...styles.formContainer, 
                height: (height > width) ? 0.65 * height : 0.65 * width, 
                marginTop: (height > width) ? 0.35 * height : 0.25 * height,
            }}
        >
            { /* Campo del Nombre */ }
            <FormGroup 
                label="Nombre"
                placeholder="Ingresa tu nombre"
                type="name"
                onChangeText={ (text) => onChangeField(text, 'name') }
                inputValue={ form.name }
                icon="person-outline"
            />

            { /* Campo del Correo */ }
            <FormGroup 
                label="Correo"
                placeholder="Ingresa tu correo"
                type="emailAddress"
                onChangeText={ (text) => onChangeField(text, 'email') }
                inputValue={ form.email }
                icon="mail-outline"
                keyboardType="email-address"
            />

            { /* Campo de Contraseña */ }
            <FormGroup
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
                type="password"
                onChangeText={ (text) => onChangeField(text, 'password') }
                inputValue={ form.password }
                icon="key-outline"
            />

            { /* Espaciador */ }
            <View style={{ marginTop: 55 }} />

            { /* Botón de registro */ }
            <FormBtn 
                text="Crear cuenta"
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