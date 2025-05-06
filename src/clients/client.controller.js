import { request, response } from "express";
import Client from './client.model.js';

export const getClients = async (req = request, res = response) => { 
    try {
        const {limite = 10, desde = 0 } = req.query;
        const query = { estado: true };

        const [total, clients] = await Promise.all([
            Client.countDocuments(query),
            Client.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        res.status(200).json({
            success: true,
            total,
            clients
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al obtener los clientes',
            error
        })
        
    }
}

export const createClient = async (req, res) => {

    try {
        const data = req.body;

        const client = new Client({
            ...data
        });

        await client.save();
            
            res.status(200).json({
                success: true,
                client
            })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al crear el cliente',
            error
        });
    }
}

export const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const data  = req.body;

        const client = await Client.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            success: true,
            msg: 'Cliente actualizado',
            client
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar el cliente',
            error
        })
    }
}

export const deleteClient = async (req, res ) => { 

    const { id } = req.params;

    try {
        await Client.findByIdAndUpdate(id, {estado: false}, {new: true})

        return res.status(200).json({
            success: true,
            msg: 'Cliente eliminado'
        })
        
    } catch (error) {
       return res.status(500).json({
            success: false,
            msg: 'Error al eliminar el cliente',
            error
        });
     }
}