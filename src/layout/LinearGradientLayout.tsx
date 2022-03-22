import React, { FC } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

/* Screens */
import ModalScreen from '../screens/ui/ModalScreen';
import LoadingScreen from '../screens/ui/LoadingScreen';

/* Components */
import { ModalStatus } from '../components/ui/ModalStatus';
import { ModalPermissions } from '../components/ui/ModalPermissions';

/* Hooks */
import useAuth from '../hooks/useAuth';
import usePermissions from '../hooks/usePermissions';
import useStatus from '../hooks/useStatus';
import useTasks from '../hooks/useTasks';

/* Hooks */
import { colors } from '../theme/app-theme';

/* Layout para mostrar un gradiente vertical */
const LinearGradientLayout: FC<{ modalOpacity?: number }> = ({ children, modalOpacity }) => {
    const { navigate, getState } = useNavigation();
    const state = getState();

    const { isAuthLoading } = useAuth();
    const { permissions, askPermissions } = usePermissions();
    const { msgError, msgSuccess, removeMsgError, removeMsgSuccess } = useStatus();
    const { selectedTask } = useTasks();

    /* Función para mostrar el modal de los permisos */
    const handleShowPermissionsModal = () => {
        return permissions.camera === 'blocked'
            || permissions.notifications === 0;
    }

    /* Función para el cierre exitoso del modal */
    const handleSuccessOnClose = () => {
        removeMsgSuccess();
        
        /**
         * Evaluacion si hay una tarea seleccionada o si el indice 
         * de la pantalla es 3 (ProfileScreen)
        */
        if (selectedTask.id || state.index === 3) return;
        navigate('HomeScreen' as never);
    }

    return (
        <LinearGradient
            style={{ flex: 1 }}
            colors={[ colors.light, colors.lightGray ]}
        >
            { /* Pantalla del modal */ }
            <ModalScreen 
                isVisible={ handleShowPermissionsModal() }
                modalOpacity={ modalOpacity }
            >

                { /* Modal de los permisos */ }
                <ModalPermissions
                    title="Está aplicación necesita permisos para funcionar correctamente"
                    onPress={ askPermissions }
                />
            </ModalScreen>

            { /* Pantalla del modal */ }
            <ModalScreen 
                isVisible={ !!msgError || !!msgSuccess }
                modalOpacity={ modalOpacity }
            >

                { /* Modal de los mensajes de error y exito */ }
                <ModalStatus 
                    msgStatus={ msgError || msgSuccess }
                    onClose={ (msgError) ? removeMsgError : handleSuccessOnClose }
                />
            </ModalScreen>

            {
                /** 
                 * Evaluación para mostrar la pantalla de carga o la 
                 * pantalla que corresponda 
                */
                isAuthLoading ? <LoadingScreen /> : children
            }
        </LinearGradient>
    );
}

export default LinearGradientLayout;