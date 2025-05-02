import Supplier from './suppliers.model.js';

export const createSupplier = async (req, res) => {
    try {
        const { name, contact, productsSupplied = [], client = false } = req.body;

        const newSupplier = new Supplier({name, contact, productsSupplied, client});

        await newSupplier.save();

        return res.status(201).json({
            success: true,
            message: 'Proveedor creado exitosamente',
            supplier: newSupplier
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
        const { name, contact, productsSupplied, client } = req.body;

        const supplier = await Supplier.findByIdAndUpdate(
            id,
            { name, contact, productsSupplied, client },
            { new: true }
        );

        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: "Proveedor no encontrado",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Proveedor actualizado",
            supplier
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
    try {
        const { id } = req.params;

        const supplier = await Supplier.findByIdAndUpdate(
            id,
            { status: false },
            { new: true }
        );

        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: "Proveedor no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Proveedor eliminado",
            supplier
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el proveedor",
            error: err.message
        });
    }
};