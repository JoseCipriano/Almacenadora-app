import { request, response } from "express";
import Category from './category.model.js';
import Product from "../products/product.model.js";

export const getCategories = async (req = request, res = response) => {
    try {
        const { limite = 10, desde = 0} = req.query;
        const query = { status: true};

        const [total, categories] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            categories
        })
    } catch (error) {
        return res.status(500).json({
            succes: false,
            msg: 'Error al obtener las categorias',
            error: error.message
        })
    }
}

export const createCategory = async (req, res) => {
    try {
        const data = req.body;

        const category = await Category.create({
            ...data
        })

        return res.status(200).json({
            succes: true,
            category
        })

    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: 'Error al crear la categoria',
            error: error.message
        });
    }
}

export const updateCategory = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { _id, ...data } = req.body;

        const category = await Category.findByIdAndUpdate(id, data, {new: true});

        return res.status(200).json({
            succes: true,
            msg: 'Categoria Actualizada',
            category
        })

    } catch (error) {
        return res.status(500).json({
            succes: false,
            msg: 'Error al actualizar la categoria',
            error: error.message
        });
    }
}

export const deleteCategory = async (req, res) => {

    const { id } = req.params;

    try {
        
        await Category.findByIdAndUpdate(id, { status: false })

        const defaultCat = await Category.findOne({nameCategory: "Uncategorized"})

        await Product.updateMany({category: id}, {category: defaultCat._id})

        return res.status(200).json({
            succes: true,
            message: 'Categoria eliminada exitosamente'
        })

    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: 'Error al eliminar la categoria',
            error: error.message
        });
    }
}