import { request, response } from 'express';
import Product from './product.model.js';
import Category from '../categories/category.model.js';
import Supplier from '../suppliers/suppliers.model.js';

export const createProduct = async (req, res) => {
    try {
        const data = req.body;

        const categoryFound = await Category.findOne({ nameCategory: data.category });
        const supplierFound = await Supplier.findOne({ name: data.supplier });

        const product = await Product.create({
            ...data,
            category: categoryFound,
            supplier: supplierFound
        });


        return res.status(200).json({
            succes: true,
            product
        });

    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: 'Error al crear el producto',
            error
        });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, category, ...data } = req.body;

        const productExist = await Product.findById(id);
        if (!productExist) {
            return res.status(404).json({
                success: false,
                msg: "Producto no encontrado",
            });
        }

        if (category) {
            const categoriaExiste = await Category.findOne({ nameCategory: category });

            if (!categoriaExiste) {
                return res.status(404).json({
                    success: false,
                    msg: "Categoría no encontrada",
                });
            }

            data.category = categoriaExiste._id;
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });

        return res.status(200).json({
            success: true,
            msg: "Producto actualizado correctamente",
            product: updatedProduct,
        });

    } catch (error) {
        return res.status(500).json({
            succes: false,
            msg: 'Error al actualizar el producto',
            error
        });
    }
}

export const deleteProduct = async (req, res) => {

    const { id } = req.params;

    try {

        await Product.findByIdAndUpdate(id, { estado: false });

        return res.status(200).json({
            succes: true,
            message: 'Producto eliminado exitosamente'
        })
        
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: 'Error al eliminar el producto',
            error
        });
    }
}

export const getProductsByName = async (req = request, res = response) => {
    try {
        const { name } = req.query;
        const query = {
            nameProduct: { $regex: name, $options: 'i' }
        };

        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query).sort({ nameProduct: 1 })
        ]);

        return res.status(200).json({
            succes: true,
            total,
            products
        });

    } catch (error) {
        return res.status(500).json({
            succes: false,
            msg: 'Error al obtener los productos',
            error
        });
    }
};

export const getProductsByCategory = async (req = request, res = response) => {
    try {
        const { category } = req.query;

        let categoryDoc = null;

        try {
            categoryDoc = await Category.findOne({ _id: category, estado: true });
        } catch (err) {
            
        }

        if (!categoryDoc) {
            categoryDoc = await Category.findOne({
                nameCategory: { $regex: category, $options: 'i' },
                estado: true
            });
        }

        if (!categoryDoc) {
            return res.status(404).json({
                succes: false,
                msg: 'Categoría no encontrada'
            });
        }

        const query = {
            category: categoryDoc._id,
            estado: true
        };

        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .sort({ nameProduct: 1 })
                .populate('category', 'nameCategory')
        ]);

        return res.status(200).json({
            succes: true,
            total,
            products
        });

    } catch (error) {
        return res.status(500).json({
            succes: false,
            msg: 'Error al obtener los productos',
            error
        });
    }
};

export const getProductsByDate = async (req = request, res = response) => {
    try {
        const { date } = req.query;

        const searchDate = new Date(date);
        const nextDay = new Date(searchDate);
        nextDay.setDate(searchDate.getDate() + 1);

        const query = {
            dateEntry: {
                $gte: searchDate,
                $lt: nextDay
            }
        };

        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query).sort({ nameProduct: 1 })
        ]);

        return res.status(200).json({
            succes: true,
            total,
            products
        })

    } catch (error) {
        return res.status(500).json({
            succes: false,
            msg: 'Error al obtener los productos',
            error
        });
    }
}