import Product from '../products/product.model.js';
import User from '../users/user.model.js';
import Category from '../categories/category.model.js';
import Client from '../clients/client.model.js';
import Role from "../role/roleModel.js"

export const existeProductoById = async (id = '') => {

    const existeProducto = await Product.findById(id);

    if(!existeProducto){
        throw new Error(`El ID ${id} no existe`)
    }
}

export const esRoleValido = async (role = '') => {
    const rolExistente = await Role.findOne({role})
    if(!rolExistente){
        throw new Error (`El rol ${role}, no existe en la base de datos`)
    }
}

export const existenteEmail = async (email = ' ') => {

    const existeEmail = await User.findOne({ email });

    if(existeEmail){
        throw new Error(`El correo ${ email } ya se encuentra registrado`);
    }
}

export const noExistenteEmail = async (email = ' ') => {

    const existeEmail = await User.findOne({ email });

    if(!existeEmail){
        throw new Error(`El correo ${ email } que intenta utilizar no se encuentra registrado`);
    }
}

export const noExistenteUsername = async (username = ' ') => {

    const existeUsername = await User.findOne({ username });

    if(!existeUsername){
        throw new Error(`El Username ${ username } que intenta utilizar no se encuentra registrado`);
    }
}

export const existenteUsername = async (username = ' ') => {

    const existeUsername = await User.findOne({ username });

    if(existeUsername){
        throw new Error(`El Username ${ username } que intenta utilizar ya fue registrado`);
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