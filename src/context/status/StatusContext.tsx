import { createContext } from 'react';

/**  
 * Definicion del tipo para las propiedades del
 * Contexto de Status
*/

/**
 * Este contexto se usa para manejar la información del status,
 * se conforma de las siguientes propiedades:
 * 
 * msgSuccess: guarda el mensaje de éxito
 * msgError: guarda el mensaje de error
 * setMsgSuccess: sirve para setear el mensaje de éxito
 * setMsgError: sirve para setear el mensaje de error
 * removeMsgSuccess: sirve para remover el mensaje de éxito
 * removeMsgError: sirve para remover el mensaje de error
 * resetStatus: sirve para resetear los mensajes de éxito y error
*/

export type StatusContextProps = {
    msgSuccess: string;
    msgError: string;
    setMsgSuccess: (msgSuccess: string) => void;
    setMsgError: (msgError: string) => void;
    removeMsgSuccess: () => void;
    removeMsgError: () => void;
    resetStatus: () => void;
}

/* Creación del contexto */
const StatusContext = createContext<StatusContextProps>({} as StatusContextProps);

export default StatusContext;