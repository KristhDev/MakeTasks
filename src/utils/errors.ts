
/* Mensajes de error de la autenticación */
export const authErrorMessages = {
    'auth/network-request-failed': 'Por favor revise su conexión a internet',
    'TypeError: Network request failed': 'Por favor revise su conexión a internet',
    'auth/user-not-found': 'El usuario no existe, por favor registrese',
    'auth/wrong-password': 'Correo o contraseña incorrectos',
    'auth/invalid-email': 'Correo o contraseña incorrectos',
    'auth/email-already-in-use': 'Ya existe una cuenta con ese correo',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
}

/* Mensajes de error de la base de datos en tiempo real */
export const rtdbErrorMessages = {
    'database/permission-denied': 'No tiene permisos para realizar esta acción',
    'database/data-not-found': 'No se encontraron datos',
    'Network request failed': 'Por favor revise su conexión a internet',
}