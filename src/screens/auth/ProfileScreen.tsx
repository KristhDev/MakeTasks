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
import useKeyboard from '../../hooks/useKeyboard';
import useTasks from '../../hooks/useTasks';

/* Theme */
import { colors } from '../../theme/app-theme';

/* Propiedades del componente */
interface Props extends DrawerScreenProps<any, any>{}

/* Pantalla para mostrar la información del usuario */
const ProfileScreen = ({ navigation }: Props) => {
    const { width, height } = useWindowDimensions();

    const { signOut } = useAuth();
    const { setKeyboardShow, keyboardShow } = useKeyboard();
    const { removeTasks, removeSearchingTasks } = useTasks();

    const windowHeight = (height >= 720 && height > width) ? height : 720;

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
            contentContainerStyle={{ flexGrow: 1 }}
            onKeyboardDidShow={ () => setKeyboardShow(true) }
            onKeyboardDidHide={ () => setKeyboardShow(false) }
        >    
            <TasksLayout
                title="Perfil"
                openDrawer={ () => navigation.openDrawer() }
                headerContainerStyle={{ backgroundColor: 'transparent' }}
                style={{
                    flexGrow: 1,
                    height: (height > width) 
                        ? (height >= 720 && height > width) ? undefined : 720
                        : width * 0.8,
                    minHeight: (height > width) 
                        ? (height >= 720 && height > width) ? '100%' : 720 
                        : width * 0.65,
                    marginBottom: keyboardShow 
                        ? (height > width) 
                            ? (249 - (249 * 0.35)) : windowHeight * -0.2
                        : 0
                }}
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
                        height: (height > width) ? windowHeight * 0.88 : width * 0.78,
                        left: -width * 0.25,
                        paddingTop: windowHeight * 0.04,
                        width: width * 1.5,
                        bottom: -180,
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