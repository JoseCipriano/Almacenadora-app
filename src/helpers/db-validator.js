import Product from '../products/product.model.js';
import User from '../users/user.model.js';

export const existeProductoById = async (id = '') => {

    const existeProducto = await Product.findById(id);

    if(!existeProducto){
        throw new Error(`El ID ${id} no existe`)
    }
}

export const esRoleValido = async (role = '') => {

}

export const existenteEmail = async (email = ' ') => {

    const existeEmail = await User.findOne({ email });

    if(existeEmail){
        throw new Error(`El correo ${ email } ya existe en la base de datos`);
    }
}




