import { useState } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { Asset, launchCamera, launchImageLibrary } from 'react-native-image-picker';

/* Hooks */
import usePermissions from './usePermissions';
import useStatus from './useStatus';

/* Hook para hacer el manejo de las imagenes */
const useImage = () => {
    const [ image, setImage ] = useState<Asset>({});
    const { isConnected } = useNetInfo();

    const { setMsgError } = useStatus();
    const { permissions, setPermissionsError } = usePermissions();

    /* Función para verificar los permisos */
    const handleCheckPermissions = async () => {
        /** 
         * Evaluación de permisos de la camara y galeria, además de 
         * verificar la conexión a internet
        */
        if (permissions.camera === 'unavailable') {
            setMsgError('Lo sentimos, pero tu dispositivo no soporta la camara o galeria');
            return false;
        }
        else if (permissions.camera === 'denied' || permissions.camera === 'blocked') {
            setPermissionsError('Por favor habilita los permisos de la camara o galeria');
            return false;
        }
        else if (!isConnected) {
            setMsgError('Lo sentimos, pero no tienes conexión a internet'); 
            return false;
        }

        return true;
    }

    /* Función para tomar una imagen de la galeria */
    const handleTakeImageFromLibrary = async () => {
        const isChecked = await handleCheckPermissions();
        if (!isChecked) return;

        const { didCancel, assets } = await launchImageLibrary({ 
            mediaType: 'photo', 
            quality: 0.5, 
            includeBase64: true 
        });

        if (didCancel) return;
        if (!assets) return;

        setImage(assets[0]);
    }

    /* Función para tomar una foto de la camara */
    const handleTakePhoto = async () => {
        const isChecked = await handleCheckPermissions();
        if (!isChecked) return;

        const { didCancel, assets } = await launchCamera({ 
            mediaType: 'photo', 
            quality: 0.5, 
            includeBase64: true 
        });

        if (didCancel) return;
        if (!assets) return;

        setImage(assets[0]);
    }

    /* Función para resetar state de la imagen */
    const removeImage = () => setImage({});

    return { 
        image, 
        setImage,
        handleTakePhoto, 
        handleTakeImageFromLibrary, 
        removeImage 
    }
}

export default useImage;