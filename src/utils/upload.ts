import { CLOUDINARY_CLOUD_NAME } from '@env';

/* Interfaces */
import { ImageResponse } from '../interfaces/ui';

/* Función para subir imagen a cloudinary */
export const uploadImage = async (image: string, uploadPreset: string) => {
    /* FormData a enviar */
    const formData = new FormData();
    formData.append('file', `data:image/jpg;base64,${ image }`);
    formData.append('upload_preset', uploadPreset);

    /* Peticion fetch a cloudinary */
    const { secure_url }: ImageResponse = await fetch(`https://api.cloudinary.com/v1_1/${ CLOUDINARY_CLOUD_NAME }/upload`, {
        method: 'POST',
        headers: {
            /* Importante enviar como multipart/form-data */
            'Content-Type': 'multipart/form-data',
        },
        body: formData
    }).then(resp => resp.json());

    return secure_url;
}