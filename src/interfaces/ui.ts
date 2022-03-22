
/* Interfaz de la response que da cloudinary al subir una imagen */
export interface ImageResponse {
    access_mode:   string;
    asset_id:      string;
    bytes:         number;
    created_at:    string;
    etag:          string;
    format:        string;
    height:        number;
    placeholder:   boolean;
    public_id:     string;
    resource_type: string;
    secure_url:    string;
    signature:     string;
    tags:          any[];
    type:          string;
    url:           string;
    version:       number;
    version_id:    string;
    width:         number;
}
