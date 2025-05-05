import Supplier from './suppliers.model.js';
import Product from '../products/product.model.js';

export const createSupplier = async (req, res) => {
    try {
        const data = req.body;

        const supplier = await Supplier.create({
            ...data
        });

        return res.status(200).json({
            success: true,
            supplier
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al crear el proveedor',
            error: err.message
        });
    }
};

export const getSuppliers = async (req, res) => {
    try{
        const{limite = 10, desde = 0} = req.query
        const query = { status: true }

        const [total, suppliers] = await Promise.all([
            Supplier.countDocuments(query),
            Supplier.find(query)
            .limit(limite)
            .skip(desde)
        ])

        return res.status(200).json({  
            success: true,
            total,
            suppliers
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los proveedores",
            error: err.message  
        })
    }
};

export const getSupplierById = async (req, res) => {
    try {
        const { id } = req.params;
        const supplier = await Supplier.findById(id);

        if (!supplier || supplier.status === false) {
            return res.status(404).json({
                success: false,
                message: "No existe el proveedor",
            });
        }

        return res.status(200).json({
            success: true,
            supplier
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener el proveedor",
            error: err.message
        });
    }
};
    
export const updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, product, ...data } = req.body;
        
        const supplierExist = await Supplier.findByIdAndUpdate(id);
        if (!supplierExist) {
            return res.status(404).json({
                success: false,
                message: "Proveedor no encontrado",
            });
        }
        if(product) {
            const productExist = await Product.findOne({ nameProduct: product });
            if(!productExist) {
                return res.status(404).json({
                    success: false,
                    message: "Producto no encontrado",
                });
            }
            data.product = productExist._id;
        }
        const updateSupplier = await Supplier.findByIdAndUpdate(id, data, {new: true})

        return res.status(200).json({
            success: true,
            message: "Proveedor actualizado",
            supplier: updateSupplier,

        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar el proveedor",
            error: err.message
        });
    }
};

export const deleteSupplier = async (req, res) => {
   const { id } = req.params;
   try {

    await Supplier.findByIdAndUpdate(id, { status: false });

    res.status(200).json({
        success: true,
        message: "Proveedor eliminado correctamente"
    })
    
   } catch (error) {
    res.status(500).json({
        success: false,
        message: "Error al eliminar el proveedor",
        error
    });
    
   }
};