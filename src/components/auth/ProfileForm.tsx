import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { object, string } from 'yup';

/* Components */
import { FormBtn } from '../ui/FormBtn';
import { FormGroup } from '../ui/FormGroup';

/* Hooks */
import useAuth from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';
import useImage from '../../hooks/useImage';
import useStatus from '../../hooks/useStatus';

/* Theme */
import { colors } from '../../theme/app-theme';

/* Esquema de validación de los campos del formulario del perfil */
const profileFormSchema = object().shape({
    name: string()
        .required('El nombre no puede estar vacío'),
    email: string()
        .required('El correo no puede estar vacío')
        .email('El correo no es válido')
});

/** 
 * Componente para mostrar el formulario del perfil y actualizar 
 * los datos del usuario
*/
export const ProfileForm = () => {
    /**
     * Primer state para desabilita el botón de guardar cambios cuando
     * este cargando
     */
    const [ isBtnDisabled, setIsBtnDisabled ] = useState<boolean>(false);
    const { height, width } = useWindowDimensions();

    const { user, updateProfile } = useAuth();
    const { form, onChangeField } = useForm({ name: user.name, email: user.email });
    const { image, handleTakeImageFromLibrary, setImage } = useImage();
    const { setMsgError } = useStatus();

    /* Función para actualizar el perfil del usuario */
    const handleSubmit = async () => {
        setIsBtnDisabled(true);

        try {
            await profileFormSchema.validate(form);
            await updateProfile({ ...form, image: image?.base64 || (user?.image || '') });
            setIsBtnDisabled(false);
        }
        catch (error: any) {
            const values = Object.values(error.errors) as string[];
            setMsgError(values[0]);
            setIsBtnDisabled(false);
        }
    }

    /** 
     * useEffect para actualizar la imagen del usuario en el state
     * del hook useImage
    */
    useEffect(() => {
        setImage({ uri: user?.image || '' });
    }, [ user ]);

    return (
        <View 
            style={{ 
                ...styles.profileForm,
                marginTop: (height > width) ? 0 : -height * 0.15,
            }}
        >
            {/* Campo de Imagen */}
            <View style={ styles.profileImage }>
                <TouchableOpacity 
                    style={ styles.profileImageContainer }
                    activeOpacity={ 0.9 }
                    onPress={ handleTakeImageFromLibrary }
                >
                    <Image 
                        source={ 
                            (image.uri) 
                                ? { uri: image.uri }
                                : require('../../assets/default-user.jpg')
                        }
                        style={{ height: 230, width: 230 }}
                    />
                </TouchableOpacity>
            </View>

            {/* Campo de Nombre */}
            <FormGroup
                icon="person-outline"
                inputValue={ form.name }
                label="Nombre"
                onChangeText={ (text) => onChangeField(text, 'name') }
                placeholder="Ingrese su nombre"
                type="name"
            />

            {/* Campo de Correo */}
            <FormGroup
                icon="mail-outline"
                inputValue={ form.email }
                label="Correo"
                onChangeText={ (text) => onChangeField(text, 'email') }
                placeholder="Ingrese su correo"
                type="emailAddress"
                keyboardType="email-address"
            />

            {/* Espaciador */}
            <View style={{ marginTop: 45 }} />

            {/* Botón para actualizar el perfil */}
            <FormBtn 
                isDisabled={ isBtnDisabled }
                onPress={ handleSubmit }
                text="Guardar cambios"
            />
        </View>
    );
}

/* Estilos del componente */
const styles = StyleSheet.create({
    profileForm: {
        flex: 1, 
        zIndex: 2, 
        alignItems: 'center'
    },

    profileImage: {
        alignItems: 'center', 
        bottom: 40, 
        marginBottom: -55
    },

    profileImageContainer: {
        alignItems: 'center',
        backgroundColor: colors.light,
        borderRadius: 999,
        borderColor: colors.light,
        borderWidth: 8,
        elevation: 6,
        justifyContent: 'center',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            height: 5,
            width: 0,
        },
        shadowOpacity: 0.30,
        shadowRadius: 6.25,
        height: 230,
        width: 230
    }
});