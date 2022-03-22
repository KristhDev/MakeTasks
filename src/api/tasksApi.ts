import { FIREBASE_API_KEY } from '@env';

/** 
 * Esta API sirve para hacer la authenticación de usuarios mediante el servicio de Firebase.
 * Unicamente se usa para renovar la autenticación puesto que el sdk de Firebase no trae
 * una función para hacerlo. 
*/
export const authApi = (method: string, endPoint: string, data: any) => {
    const baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts';

    return fetch(`${ baseUrl }${ endPoint }?key=${ FIREBASE_API_KEY }`, {
        method,
        body: JSON.stringify(data)
    });
}