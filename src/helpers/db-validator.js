import Product from '../products/product.model.js';
import User from '../users/user.model.js';
import Category from '../categories/category.model.js';
import Client from '../clients/client.model.js';

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

export const existeCategoriaById = async (id = '') => {

    const existeCategoria = await Category.findById(id);

    if(!existeCategoria){
        throw new Error(`El ID ${id} no existe`);
    }

}

export const existeClienteById = async (id = '') => {

    const existeCliente = await Client.findById(id);
    if(!existeCliente){
        throw new Error(`El ID ${id} no existe`);
    }

}