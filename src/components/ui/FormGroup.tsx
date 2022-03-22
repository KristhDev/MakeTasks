import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, useWindowDimensions, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/* Theme */
import { colors } from '../../theme/app-theme';

/* Propiedades del componente */
interface Props {
    label: string;
    placeholder: string;
    type: TextInputProps['textContentType'];
    keyboardType?: TextInputProps['keyboardType'];
    inputValue: string;
    icon?: string;
    onChangeText: (text: string, ...rest: any) => void;
}

/* Componente para mostrar un campo del formulario */
export const FormGroup = ({ label, placeholder, onChangeText, type, keyboardType = 'default', inputValue, icon }: Props) => {
    const { width, height } = useWindowDimensions();

    return (
        <View 
            style={{ 
                ...styles.formGroup, 
                width: (height > width) ? width * 0.82 : width * 0.6,
            }}
        >
            { /* Etiqueta del campo */ }
            <Text style={ styles.formGroupText }>{ label }</Text>

            { /* Caja de texto para el campo */ }
            <View style={ styles.inputContainer }>
                <TextInput
                    autoCapitalize="none"
                    autoComplete="off"
                    blurOnSubmit
                    disableFullscreenUI
                    keyboardType={ keyboardType }
                    onChangeText={ (text) => onChangeText(text) }
                    placeholder={ placeholder }
                    placeholderTextColor={ colors.textGray }
                    secureTextEntry={ type === 'password' }
                    style={ styles.formGroupInput }
                    textContentType={ type }
                    value={ inputValue }
                />

                {
                    /* Evaluación para mostrar el icono */
                    icon && (
                        <Icon 
                            name={ icon } 
                            size={ 28 } 
                            color={ colors.light } 
                        />
                    )
                }
            </View>
        </View>
    );
}

/* Estilos del componente */
const styles = StyleSheet.create({
    formGroup: {
        alignItems: 'center',
        marginTop: 30
    },

    formGroupText: {
        alignSelf: 'flex-start',
        color: colors.light,
        fontSize: 20
    },

    inputContainer: {
        alignItems: 'center',
        backgroundColor: colors.darkBlue,
        borderRadius: 10,
        elevation: 6,
        flexDirection: 'row',
        marginTop: 10,
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: {
            height: 5,
            width: 0,
        },
        shadowOpacity: 0.30,
        shadowRadius: 6.25,
        width: '98%',
    },

    formGroupInput: {
        color: colors.light,
        fontSize: 18,
        width: '90%'
    }
});