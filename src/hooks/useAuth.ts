import { useContext } from 'react';
import AuthContext from '../context/auth/AuthContext';

/**
 * Hook para devolver todo el state y funciones del Contexto 
 * de Autenticación
*/
const useAuth = () => useContext(AuthContext);

export default useAuth;