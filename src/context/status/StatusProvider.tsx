import React, { useState, FC, useEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASYNCSTORAGE_ID_TOKEN } from '@env';

/* Context */
import StatusContext from './StatusContext';

/* Provider para dar la información de los status */
const StatusProvider: FC = ({ children }) => {
    const [ msgSuccess, setMsgSuccess ] = useState<string>('');
    const [ msgError, setMsgError ] = useState<string>('');

    const { isConnected } = useNetInfo();

    /* Función para resetear el mensaje de éxito */
    const removeMsgSuccess = () => setMsgSuccess('');

    /* Función para resetear el mensaje de error */
    const removeMsgError = () => setMsgError('');

    /* Función para resetear los mensajes de éxito y error */
    const resetStatus = () => {
        removeMsgSuccess();
        removeMsgError();
    }

    /* Función para comprobar la conexión a internet */
    const checkWifiConextion = async () => {
        /* Obtener el idToken */
        const idToken = await AsyncStorage.getItem(ASYNCSTORAGE_ID_TOKEN) || '';

        /* Evaluar si hay idToken y si no hay conexión a internet */
        if (idToken && isConnected === false) {
            setMsgError('Por favor verifique su conexión. Al aplicación se puede seguir usando, podra realizar acciones pero los cambios se reflejaran cuando se vuelva a conectar a internet; lo único que no puede actualizar es su información de usuario');
        }
    }

    /**
     * useEffect que ejecuta la función checkWifiConexion cada 
     * vez que isConnected cambia }
    */
    useEffect(() => {
        checkWifiConextion();
    }, [ isConnected ]);

    return (
        <StatusContext.Provider
            value={{
                msgSuccess,
                msgError,
                setMsgSuccess,
                setMsgError,
                removeMsgSuccess,
                removeMsgError,
                resetStatus
            }}
        >
            { children }
        </StatusContext.Provider>
    );
}

export default StatusProvider;