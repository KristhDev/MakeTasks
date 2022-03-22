import { useContext } from 'react';
import StatusContext from '../context/status/StatusContext';

/**
 * Hook para devolver todo el state y funciones del Contexto 
 * del Status
*/
const useStatus = () => useContext(StatusContext);

export default useStatus;