import React from 'react';
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