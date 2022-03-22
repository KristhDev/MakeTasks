import React, { useEffect, useReducer, FC } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CLOUDINARY_UPLOAD_PRESET, ASYNCSTORAGE_ID_TOKEN, ASYNCSTORAGE_USER } from '@env';

/* Context */
import AuthContext from './AuthContext';
import authReducer from './authReducer';

/* Hooks */
import useStatus from '../../hooks/useStatus';

/* Interfaces */
import { AuthState, SingInData, RenewAuthResponse, UpdateProfileData, User } from '../../interfaces/auth';

/* Utils */
import { authErrorMessages } from '../../utils/errors';
import { uploadImage } from '../../utils/upload';

/* Api */
import { authApi } from '../../api/tasksApi';

/* Estado inicial del contexto */
const INITIAL_STATE: AuthState = {
    isAuthenticated: false,
    isAuthLoading: false,
    idToken: '',
    user: {
        id: '',
        name: '',
        email: '',
        image: ''
    }
}

/* Autenticación del servicio de firebase */
const firebaseAuth = auth();

/* Provider para dar la información de la autenticación */
const AuthProvider: FC = ({ children }) => {
    const [ state, dispatch ] = useReducer(authReducer, INITIAL_STATE);

    const { setMsgError, setMsgSuccess } = useStatus();

    const { isConnected } = useNetInfo();

    /* Función para registar a un usuario */
    const signUp = async ({ name, email, password }: SingInData) => {
        dispatch({ type: 'toggleIsAuthLoading' });

        try {
            /* Creando usuario con servicio de firebase */
            const { user } = await firebaseAuth.createUserWithEmailAndPassword(email, password);
            await user.updateProfile({ displayName: name });

            await setUser(user, name, email);
        }
        catch (error) {
            console.log(error);

            /* Captura de error */
            const codeError = (error as FirebaseAuthTypes.NativeFirebaseAuthError).code as keyof typeof authErrorMessages;
            const msg = authErrorMessages[codeError] || 'Error en el serivdor, por favor intente más tarde';

            /* Seteo del error en StatusContext */
            setMsgError(msg);
            dispatch({ type: 'toggleIsAuthLoading' });
        }
    }

    /* Función para iniciar sesión */
    const signIn = async (email: string, password: string) => {
        dispatch({ type: 'toggleIsAuthLoading' });

        try {
            /* Inicio de sesión con servicio de firebase */
            const { user } = await firebaseAuth.signInWithEmailAndPassword(email, password);
            await setUser(user, user.displayName || '', email);
        }
        catch (error) {
            console.log(error);

            /* Captura de error */
            const codeError = (error as FirebaseAuthTypes.NativeFirebaseAuthError).code as keyof typeof authErrorMessages;
            const msg = authErrorMessages[codeError] || 'Error en el serivdor, por favor intente más tarde';

            /* Seteo del error en StatusContext */
            setMsgError(msg);
            dispatch({ type: 'toggleIsAuthLoading' });
        }
    }

    /* Función para cerrar sesión */
    const signOut = async () => {
        /* Borrar información del AsyncStorage */
        await AsyncStorage.removeItem(ASYNCSTORAGE_ID_TOKEN);
        await AsyncStorage.removeItem(ASYNCSTORAGE_USER);
        dispatch({ type: 'userLogout'});
    }

    /* Función para verficar la sesión */
    const checkAuth = async () => {
        try {
            /* Obtención del idToken del AsyncStorage */
            const idToken = await AsyncStorage.getItem(ASYNCSTORAGE_ID_TOKEN);
            if (!idToken) return false;

            let user: User = {} as User;

            /* Evaluación si hay conexión de internet */
            if (isConnected) {
                /* Renovando autenticación mediante api */
                const { users }: RenewAuthResponse = await authApi('POST', ':lookup', { idToken })
                    .then(res => res.json());

                /* Verificando si hay un usuario */
                if (!users) {
                    await signOut();
                    setMsgError('El tiempo de sesión ha expirado o su autenticación no es válida');
                    return false;
                }

                user = {
                    id: users[0].localId,
                    name: users[0].displayName,
                    email: users[0].email,
                    image: users[0]?.photoUrl || ''
                }
            }
            else {
                /* Si no hay internet, se saca el user el AsyncStorage */
                const userStorage = await AsyncStorage.getItem(ASYNCSTORAGE_USER) || '';
                user = JSON.parse(userStorage);
            }

            dispatch({
                type: 'userLogin',
                payload: {
                    idToken,
                    user
                }
            });

            return true;
        } 
        catch (error) {
            await signOut();
            console.log(error);

            /* Captura de error */
            const codeError = (error as FirebaseAuthTypes.NativeFirebaseAuthError).code as keyof typeof authErrorMessages;
            const msg = authErrorMessages[codeError] || 'Error en el servidor, por favor intente más tarde';

            /* Seteo del error en StatusContext */
            setMsgError(msg);
            return false;
        }
    }

    /* Función para renovar la sesión */
    const renewAuth = async () => {
        try {
            /* Obtención del idToken del AsyncStorage */
            const idToken = await AsyncStorage.getItem(ASYNCSTORAGE_ID_TOKEN) || '';
            if (!idToken) return;

            dispatch({ type: 'toggleIsAuthLoading' });

            let user = {} as User;

            /* Evaluación si hay conexión de internet */
            if (isConnected) {
                /* Renovando autenticación mediante api */
                const { users }: RenewAuthResponse = await authApi('POST', ':lookup', { idToken })
                    .then(res => res.json());

                /* Verificando si hay un usuario */
                if (!users) {
                    await signOut();

                    return setMsgError('El tiempo de sesión ha expirado o su autenticación no es válida');
                }

                user = {
                    id: users[0].localId,
                    name: users[0].displayName,
                    email: users[0].email,
                    image: users[0]?.photoUrl || ''
                }
            }
            else {
                /* Si no hay internet, se saca el user el AsyncStorage */
                const userStorage = await AsyncStorage.getItem(ASYNCSTORAGE_USER) || '';
                user = JSON.parse(userStorage);
            }

            dispatch({
                type: 'userLogin',
                payload: {
                    idToken,
                    user
                }
            });
        } 
        catch (error) {
            await signOut();
            console.log(error);

            /* Captura de error */
            const codeError = (error as FirebaseAuthTypes.NativeFirebaseAuthError).code as keyof typeof authErrorMessages;
            const msg = authErrorMessages[codeError] || 'Error en el servidor, por favor intente más tarde';

            /* Seteo del error en StatusContext */
            setMsgError(msg);
        }
    }

    /* Función para actualizar el usuario */
    const updateProfile = async (userData: UpdateProfileData) => {
        try {
            /* Sacar el usuario de firebase */
            const user = firebaseAuth.currentUser;
            if (!user) return;

            /* Imagen del usuario */
            let imageUrl = state.user?.image || '';

            /* Evaluar si hay una nueva imagen para subirla */
            if (imageUrl !== userData.image) {
                imageUrl = await uploadImage(userData.image, CLOUDINARY_UPLOAD_PRESET);
            }

            /* Evaluar si el correo es distinto */
            if (state.user.email !== userData.email) await user.updateEmail(userData.email);

            await user.updateProfile({ displayName: userData.name, photoURL: imageUrl });

            dispatch({
                type: 'userUpdate',
                payload: {
                    user: {
                        id: state.user.id,
                        name: userData.name,
                        email: userData.email,
                        image: imageUrl
                    }
                }
            });

            /* Seteo del mensaje de exito en StatusContext */
            setMsgSuccess('Perfil actualizado correctamente');
        }
        catch (error) {
            console.log(error);

            /* Captura de error */
            const codeError = (error as FirebaseAuthTypes.NativeFirebaseAuthError).code as keyof typeof authErrorMessages;
            const msg = authErrorMessages[codeError] || 'Error en el serivdor, por favor intente más tarde';

            /* Seteo del error en StatusContext */
            setMsgError(msg);
        }
    }

    /* Función para setar user en el Context y AsyncStorage */
    const setUser = async (user: FirebaseAuthTypes.User, name: string, email: string) => {
        /* Obtener idToken */
        const idToken = await user.getIdToken();

        /* Guardar idToken en el AsyncStorage */
        await AsyncStorage.setItem(ASYNCSTORAGE_ID_TOKEN, idToken);

        const userData = {
            id: user.uid,
            name,
            email,
            image: user.photoURL
        }

        /* Guardar user en el AsyncStorage */
        await AsyncStorage.setItem(ASYNCSTORAGE_USER, JSON.stringify(userData));

        /* Seteo del usuario */
        dispatch({
            type: 'userLogin',
            payload: {
                user: userData,
                idToken
            }
        });
    }

    /* useEffect para renovar autenticación no más se monte el Provider */
    useEffect(() => {
        renewAuth();
    }, []);

    return (
        <AuthContext.Provider 
            value={{ 
                ...state, 
                signUp, 
                signIn, 
                signOut, 
                renewAuth,
                checkAuth,
                updateProfile
            }}
        >
            { children }
        </AuthContext.Provider>
    );
}

export default AuthProvider;