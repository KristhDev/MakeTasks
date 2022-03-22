import { useContext } from 'react';
import PermissionsContext from '../context/permissions/PermissionsContext';

/**
 * Hook para devolver todo el state y funciones del Contexto 
 * de los Permisos
*/
const usePermissions = () => useContext(PermissionsContext);

export default usePermissions;