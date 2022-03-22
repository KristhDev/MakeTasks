import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/* Layouts */
import TasksLayout from '../../layout/TasksLayout';

/* Components */
import { ProfileForm } from '../../components/auth/ProfileForm';

/* Theme */
import { colors } from '../../theme/app-theme';

/* Propiedades del componente */
interface Props extends DrawerScreenProps<any, any>{}

/* Pantalla para mostrar la información del usuario */
const ProfileScreen = ({ navigation }: Props) => {
    const { width, height } = useWindowDimensions();

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={ false }
            extraHeight={ 50 }
            enableOnAndroid
        >
            <TasksLayout
                title="Perfil"
                openDrawer={ () => navigation.openDrawer() }
                headerContainerStyle={{ backgroundColor: 'transparent' }}
            >
                { /* Formulario */ }
                <ProfileForm />

                { /* Fondo */ }
                <View 
                    style={{ 
                        ...styles.background,
                        height: (height > width) ? height * 0.78 : width * 0.78,
                        left: -width * 0.25,
                        paddingTop: height * 0.04,
                        width: width * 1.5,
                        bottom: -100,
                    }}
                />
            </TasksLayout>
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
        flex: 1
    },
});

export default ProfileScreen;