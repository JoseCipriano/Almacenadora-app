

export const validateAvatarUrl = (url) => {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return  regex.test (url);
}

export const avatarUrlValidationMessage = 'El URL de la imagen no es válido.';