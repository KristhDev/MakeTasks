import { createContext } from 'react';

/* Interfaces */
import { UpdateProfileData, User } from '../../interfaces/auth';

/**
 * Definicion del tipo para las propiedades del 
 * Contexto de Autenticación 
*/

/**  
 * Este contexto se usa para manejar la información de autenticación,
 * se conforma de las siguientes propiedades:
 *
 * isAuthenticated: sirve para saber si el usuario está autenticado o no
 * isAuthLoading: sirve manejar la carga de la información de autenticación
 * idToken: es el token de autenticación del usuario
 * user: es el usuario autenticado
 * singUp: es una función para registrar un usuario
 * signIn: es una función para iniciar sesión
 * signOut: es una función para cerrar sesión
 * renewAuth: es una función para renovar la autenticación del usuario
 * checkAuth: es una función para verificar la autenticación del usuario
 * updateProfile: es una función para actualizar el perfil del usuario
*/

export type AuthContextProps = {
    isAuthenticated: boolean;
    isAuthLoading: boolean;
    idToken: string;
    user: User
    signUp: (data: { name: string, email: string, password: string }) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
    renewAuth: () => Promise<void>;
    checkAuth: () => Promise<boolean>;
    updateProfile: (userData: UpdateProfileData) => Promise<void>;
}

/* Creación del contexto */
const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export default AuthContext;