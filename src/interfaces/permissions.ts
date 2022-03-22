import { PermissionStatus } from 'react-native-permissions';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

/* Interfaz para el state del Contexto de Permisos */
export interface PermissionsState {
    camera: PermissionStatus;
    notifications: FirebaseMessagingTypes.AuthorizationStatus;
}