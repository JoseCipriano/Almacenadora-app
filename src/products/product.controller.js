import { request, response } from 'express';
import Product from './product.model.js';

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

        res.status(200).json({
            succes: true,
            total,
            products
        });

    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: 'Error al obtener los productos',
            error
        });
    }
};

export const getProductsByCategory = async (req = request, res = response) => {
    try {
        const { category } = req.query;
        const query = {
            category: { $regex: category, $options: 'i' }
        };

        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query).sort({ nameProduct: 1 })
        ]);

        res.status(200).json({
            succes: true,
            total,
            products
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: 'Error al obtener los productos',
            error
        })
    }
}

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

        res.status(200).json({
            succes: true,
            total,
            products
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: 'Error al obtener los productos',
            error
        });
    }
}

export const createProduct = async (req, res) => {
    try {
        const data = req.body;

        const product = new Product({
            ...data
        });

        await product.save();

        res.status(200).json({
            succes: true,
            product
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            message: 'Error al crear el producto',
            error
        });
    }
}

export const updateProduct = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { _id, ...data } = req.body;

        const product = await Product.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            succes: true,
            msg: 'Producto Actualizado',
            product
        })

    } catch (error) {
        res.status(500).json({
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

        res.status(200).json({
            succes: true,
            message: 'Producto eliminado exitosamente'
        })
        
    } catch (error) {
        res.status(500).json({
            succes: false,
            message: 'Error al eliminar el producto',
            error
        });
    }
}