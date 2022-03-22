import React, { useEffect, useState, FC } from 'react';
import { AppState } from 'react-native';
import { request, check, PERMISSIONS, openSettings } from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';

/* Context */
import PermissionsContext from './PermissionsContext';

/* Interfaces */
import { PermissionsState } from '../../interfaces/permissions';

/* Estado inicial del contexto */
const INITIAL_STATE: PermissionsState = {
    camera: 'unavailable',
    notifications: -1 // Not determined
}

/* Provider para dar la información de los permisos */
const PermissionsProvider: FC = ({ children }) => {
    const [ permissions, setPermissions ] = useState<PermissionsState>(INITIAL_STATE);

    /* Función para preguntar por los permisos */
    const askPermissions = async () => {
        /* Preguntar por permisos */
        const permissionStatusCamera = await request(PERMISSIONS.ANDROID.CAMERA);
        const permissionStatusNotifications = await messaging().requestPermission();

        /* Verificar los resultados */
        if (permissionStatusCamera === 'blocked' || permissionStatusNotifications === 0) {
            /* Si el usuario no acepta los permisos, abrir la configuración */
            openSettings();
        }

        /* Setear los permisos */
        setPermissions({ 
            ...permissions, 
            camera: permissionStatusCamera, 
            notifications: permissionStatusNotifications 
        });
    }

    /* Función para verificar los permisos */
    const checkPermissions = async () => {
        /* Verificar permisos */
        const permissionStatusCamera = await check(PERMISSIONS.ANDROID.CAMERA);
        const permissionStatusNotifications = await messaging().hasPermission();

        /* Setear los permisos */
        setPermissions({ 
            ...permissions, 
            camera: permissionStatusCamera, 
            notifications: permissionStatusNotifications 
        });
    }

    /** 
     * useEffect para que no más se monte el Provider preguntar por los permiso, 
     * además se puso un listener para verificar los permisos constantemente 
    */
    useEffect(() => {
        askPermissions();

        /* Listener para verificar los permisos */
        const unSubscribreAppState = AppState.addEventListener('change', async (state) => {
            if (state !== 'active') return;
            await checkPermissions();
        });

        /* Limpieza del listener */
        return () => {
            unSubscribreAppState.remove();
        }
    }, []);

    return (
        <PermissionsContext.Provider
            value={{ 
                permissions,
                askPermissions,
                checkPermissions
            }}
        >
            { children }
        </PermissionsContext.Provider>
    );
}

export default PermissionsProvider;