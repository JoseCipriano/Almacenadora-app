
export const validateEmail = (email) => {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
}

export const emailValidationMessage = 'El correo electrónico no es válido.';