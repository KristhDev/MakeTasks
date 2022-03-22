
/* Interfaces */
import { AuthAction, AuthState } from '../../interfaces/auth';

/* Reducer para manejar el state de la autentiación */
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {

        /* Setear el usuario */
        case 'userLogin':
            return {
                ...state,
                isAuthenticated: true,
                isAuthLoading: false,
                user: action.payload.user,
                idToken: action.payload.idToken,
            }

        /* Actualizar el usuario */
        case 'userUpdate':
            return {
                ...state,
                user: { ...action.payload.user }
            }

        /* Cerrar sesión del usuario */
        case 'userLogout':
            return {
                ...state,
                isAuthenticated: false,
                isAuthLoading: false,
                user: {
                    id: '',
                    name: '',
                    email: '',
                    image: ''
                },
                idToken: ''
            }

        /* Cargando el estado de la autenticación */
        case 'toggleIsAuthenticated':
            return {
                ...state,
                isAuthenticated: !state.isAuthenticated
            }

        /* Setear si esta cargando la autenticación */
        case 'toggleIsAuthLoading': 
            return {
                ...state,
                isAuthLoading: !state.isAuthLoading
            }

        /* Retonar estado por defecto */
        default:
            return state;
    }
}

export default authReducer;