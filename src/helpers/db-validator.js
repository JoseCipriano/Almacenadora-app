import Product from '../products/product.model.js';
import User from '../users/user.model.js';
import Category from '../categories/category.model.js';
import Client from '../clients/client.model.js';
import Role from "../role/roleModel.js"

//////////////////////////////////////////////////// PRODUCTS /////////////////////////////////////////////////////////////////////////
export const existeProductoById = async (id = '') => {

    const existeProducto = await Product.findById(id);

    if(!existeProducto){
        throw new Error(`El ID ${id} no existe`)
    }
}

export const noExistenteCategory = async (nameCategory = "") => {

    const existeCategoria = await Category.findOne({ nameCategory })

    if(!existeCategoria){
        throw new Error(`La categoria ${nameCategory} no existe`)
    }
}

export const noExistenteSupplier = async (name = "") => {

    const existenteSupplier = await Supplier.findOne({ name })

    if(!existenteSupplier){
        throw new Error(`El proveedor ${name} no existe`)
    }

}

export const existProductName = async(nameProduct = "") =>{
    const existName = await Product.findOne({ nameProduct })
    if(existName){
        throw new Error(`El producto ${nameProduct} ya fue registrado`)
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////// ROLES //////////////////////////////////////////////////////////////////////////
export const esRoleValido = async (role = '') => {
    const rolExistente = await Role.findOne({role})
    if(!rolExistente){
        throw new Error (`El rol ${role}, no existe en la base de datos`)
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////// USERS /////////////////////////////////////////////////////////////////////////
export const existenteEmail = async (email = ' ') => {

    const existeEmail = await User.findOne({ email });

    if(existeEmail){
        throw new Error(`El correo ${ email } ya se encuentra registrado`);
    }
}

export const notDeleteAdmin = async(id = "") =>{
    const admin = await User.findById(id)

    if(admin.name === "Admin"){
        throw new Error(`El usuario ${admin.name} no puede ser eliminado`)
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////// CATEGORIES /////////////////////////////////////////////////////////
export const existeCategoriaById = async (id = '') => {

    const existeCategoria = await Category.findById(id);

    if(!existeCategoria){
        throw new Error(`El ID ${id} no existe`);
    }
}

export const existenteCategory = async (nameCategory = "") => {

    const existeCategoria = await Category.findOne({ nameCategory })

    if(existeCategoria){
        throw new Error(`La categoria ${nameCategory} ya fue registrada`)
    }
}

export const notDeleteCategory = async(id = "") =>{
    const notDelete = await Category.findById(id)
    if(notDelete.nameCategory === "Uncategorized"){
        throw new Error(`La categoria ${notDelete.nameCategory} no puede ser eliminada`)
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////// CLIENTS ///////////////////////////////////////////////////////////
export const noExisteClienteById = async (id = '') => {

    const existeCliente = await Client.findById(id);
    if(!existeCliente){
        throw new Error(`El ID ${id} no existe`);
    }

}

export const existEmailClient = async(email = "") =>{
    const existEmail = await Client.findOne({ email })
    if(existEmail){
        throw new Error(`El correo ${email} ya esta siendo utilizado por otro cliente`)
    }
}

export const existPhoneClient = async(phone = "") =>{
    const existPhone = await Client.findOne({ phone })
    if(existPhone){
        throw new Error(`El numero telefonico ${phone} ya esta siendo utilizado por otro cliente`)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////// SUPPLIERS //////////////////////////////////////////////////////////////
export const existeProveedorById = async (id= '') => {

    const existeProveedor = await Supplier.findById(id);
    
    if(!existeProveedor){
        throw new Error(`El ID ${id} no existe`)
    }
}

export const existenteSupplier = async (name = "") => {

    const existenteSupplier = await Supplier.findOne({ name })

    if(existenteSupplier){
        throw new Error(`El proveedor ${name} ya fue registrado`)
    }

}

export const existContactSupplier = async(contact = "") =>{
    const existContact = await Supplier.findOne({ contact })

    if(existContact){
        throw new Error(`El email ${contact} ya pertenece a otro distribuidor`)
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////