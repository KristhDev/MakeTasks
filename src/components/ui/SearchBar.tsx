import React from 'react';
import { View, TextInput, StyleSheet, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/* Theme */
import { colors } from '../../theme/app-theme';

/* Propiedades del componente */
interface Props {
    value: string;
    onTextChange: (text: string) => void;
    onSearchPress: () => void;
    searchContainerStyle?: StyleProp<ViewStyle>;
}

/* Componente para mostrar un barra de busqueda */
export const SearchBar = ({ value, onSearchPress, onTextChange, searchContainerStyle }: Props) => {
    return (
        <View style={{ ...styles.searchContainer, ...searchContainerStyle as any }}>
            { /* Caja de texto para escribir la busqueda */ }
            <TextInput
                autoCapitalize="none"
                autoCorrect={ false }
                blurOnSubmit
                onChangeText={ (text) => onTextChange(text) }
                placeholder="Buscar tarea"
                placeholderTextColor="gray"
                style={ styles.searchInput } 
                value={ value }
            />

            { /* Botón para buscar */ }
            <TouchableOpacity
                style={ styles.searchBtn }
                onPress={ onSearchPress }
                activeOpacity={ 0.8 }
            >
                <Icon 
                    name="search-outline"
                    size={ 32 }
                    color="gray"
                />
            </TouchableOpacity>
        </View>
    );
}

/* Estilos del componente */
const styles = StyleSheet.create({
    searchContainer: {
        alignItems: 'center',
        backgroundColor: colors.lightGray,
        borderRadius: 20,
        elevation: 7,
        flexDirection: 'row',
        height: 55,
        justifyContent: 'center',
        paddingHorizontal: 5,
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOffset: {
            height: 7,
            width: 0,
        },
        shadowOpacity: 0.30,
        shadowRadius: 6.25,
        width: '90%',   
        zIndex: 999
    },

    searchInput: {
        color: '#000',
        fontSize: 18,
        width: '85%'
    },

    searchBtn: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});