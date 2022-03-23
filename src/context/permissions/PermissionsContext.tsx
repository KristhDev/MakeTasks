import { createContext } from 'react';

/* Interfaces */
import { PermissionsState } from '../../interfaces/permissions';

/**  
 * Definicion del tipo para las propiedades del
 * Contexto de Permisos
*/

/**
 * Este contexto se usa para manejar la información de permisos,
 * se conforma de las siguientes propiedades:
 * 
 * permissions: sirve para almacenar los permisos otorgados
 * askPermissions: sirve para pedir los permisos al usuario
 * checkPermissions: sirve para verificar los permisos otorgados
*/

export type PermissionsContextProps = {
    permissions: PermissionsState;
    askPermissions: () => Promise<void>;
    checkPermissions: () => Promise<void>;
    permissionsError: string;
    setPermissionsError: (error: string) => void;
}

/* Creación del contexto */
const PermissionsContext = createContext<PermissionsContextProps>({} as PermissionsContextProps);

export default PermissionsContext;