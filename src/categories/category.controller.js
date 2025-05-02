import { request, response } from "express";
import Category from './category.model.js';

export const getCategories = async (req = request, res = response) => {
    try {
        const { limite = 10, desde = 0} = req.query;
        const query = { estado: true};

        const [total, categories] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        res.status(200).json({
            success: true,
            total,
            categories
        })
    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: 'Error al obtener las categorias',
            error
        })
    }
}

export const createCategory = async (req, res) => {
    try {
        const data = req.body;

        const category = new Category({
            ...data
        });

        await category.save();

        res.status(200).json({
            succes: true,
            category
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            message: 'Error al crear la categoria',
            error
        });
    }
}

export const updateCategory = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { _id, ...data } = req.body;

        const category = await Category.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            succes: true,
            msg: 'Categoria Actualizada',
            category
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: 'Error al actualizar la categoria',
            error
        });
    }
}

export const deleteCategory = async (req, res) => {

    const { id } = req.params;

    try {
        
        await Category.findByIdAndUpdate(id, { estado: false })

        res.status(200).json({
            succes: true,
            message: 'Categoria eliminada exitosamente'
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            message: 'Error al eliminar la categoria',
            error
        });
    }
}