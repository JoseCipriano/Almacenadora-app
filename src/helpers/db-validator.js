import Product from '../products/product.model.js';

export const existeProductoById = async (id = '') => {

    const existeProducto = await Product.findById(id);

    if(!existeProducto){
        throw new Error(`El ID ${id} no existe`)
    }
}