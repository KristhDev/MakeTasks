import React, { useState } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/* Layouts */
import TasksLayout from '../../layout/TasksLayout';

/* Components */
import { Fab } from '../../components/ui/Fab';
import { ProfileForm } from '../../components/auth/ProfileForm';

/* Hooks */
import useAuth from '../../hooks/useAuth';
import useTasks from '../../hooks/useTasks';

/* Theme */
import { colors } from '../../theme/app-theme';

/* Propiedades del componente */
interface Props extends DrawerScreenProps<any, any>{}

/* Pantalla para mostrar la información del usuario */
const ProfileScreen = ({ navigation }: Props) => {
    const { width, height } = useWindowDimensions();
    const [ keyboardShow, setKeyboardShow ] = useState(false);

    const { signOut } = useAuth();
    const { removeTasks, removeSearchingTasks } = useTasks();

    /* Función para desloguarse */
    const handleSignOut = () => {
        signOut();
        removeTasks();
        removeSearchingTasks();
    }

    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            extraHeight={ 50 }
            overScrollMode="never"
            showsVerticalScrollIndicator={ false }
            contentContainerStyle={{ flexGrow: (!keyboardShow) ? 1 : 0 }}
            onKeyboardDidShow={ () => setKeyboardShow(true) }
            onKeyboardDidHide={ () => setKeyboardShow(false) }
        >    
            <TasksLayout
                title="Perfil"
                openDrawer={ () => navigation.openDrawer() }
                headerContainerStyle={{ backgroundColor: 'transparent' }}
                style={{ height: (height > width) ? undefined : width * 0.8 }}
            >

                { /* Espaciador para cuando se abre el teclado */ }
                <View 
                    style={{ 
                        height: (keyboardShow) 
                            ? (height > width) ? height * 0.2475 : 0 
                            : 0 
                    }} 
                />

                { /* Formulario */ }
                <ProfileForm />

                { /* Boton para cerrar la sesión */ }
                <Fab 
                    onPress={ handleSignOut }
                    icon="log-out-outline"
                    style={{ right: 20, bottom: 20 }}
                />

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