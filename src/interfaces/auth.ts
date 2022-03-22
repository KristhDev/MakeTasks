
/* Interfaz del state del contexto de la Autenticación */
export interface AuthState {
    isAuthenticated: boolean;
    isAuthLoading: boolean;
    idToken: string;
    user: User;
}

/* Tipo para definir los tipos de acciones que tendra el reducer de Autenticación */
export type AuthAction = 
    { type: 'userLogin', payload: { user: User, idToken: string } }
    | { type: 'userUpdate', payload: { user: User } }
    | { type: 'userLogout' }
    | { type: 'toggleIsAuthenticated' }
    | { type: 'toggleIsAuthLoading' }

export interface User {
    id: string;
    name: string;
    email: string;
    image: string | null;
}

export interface UpdateProfileData {
    name: string;
    email: string; 
    image: string;
}

export interface SingInData {
    name: string;
    email: string;
    password: string;
}

/* Interfaz que para la response al renovar Autenticación */
export interface RenewAuthResponse {
    kind:  string;
    users: UserRenew[];
}

export interface UserRenew {
    localId:           string;
    email:             string;
    emailVerified:     boolean;
    displayName:       string;
    providerUserInfo:  ProviderUserInfo[];
    photoUrl:          string;
    passwordHash:      string;
    passwordUpdatedAt: number;
    validSince:        string;
    disabled:          boolean;
    lastLoginAt:       string;
    createdAt:         string;
    customAuth:        boolean;
}

export interface ProviderUserInfo {
    providerId:  string;
    displayName: string;
    photoUrl:    string;
    federatedId: string;
    email:       string;
    rawId:       string;
    screenName:  string;
}
