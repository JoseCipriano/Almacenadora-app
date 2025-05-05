import Client from '../clients/client.model.js';
import Product from '../products/product.model.js';
import User from '../users/user.model.js';
import Movement from './movementModel.js';

export const createMovement = async (req, res) => {
    try {
        const data = req.body

        const findClient = await Client.findOne({nameClient: data.client})
        const findProduct = await Product.findOne({nameProduct: data.product}).populate("category", "nameCategory").populate("supplier", "name")
        const findEmployee = await User.findOne({name: data.employee})
        
        if(data.type === "Entrada"){
            await Product.findOneAndUpdate({nameProduct: data.product}, {stock: findProduct.stock + data.quantity}, {new: true})
        }else if(data.type === "Salida"){
            await Product.findOneAndUpdate({nameProduct: data.product}, {stock: findProduct.stock - data.quantity}, {new: true})
        }
        
        const newMovement = await Movement.create({
            ...data,
            client: findClient,
            product: findProduct,
            employee: findEmployee
        })

        return res.status(201).json({
            msg: "Movimiento realizado con exito!",
            movement:{
                id: newMovement._id,
                type: newMovement.type,
                quantity: newMovement.quantity,
                product: {
                    name: findProduct.nameProduct,
                    category:  findProduct.category?.nameCategory
                },
                date: newMovement.type === "Entrada" ? newMovement.entryDate : newMovement.exitDate,
                employee: {
                    name: findEmployee.name,
                    email: findEmployee.email
                },
                responsible: newMovement.type === "Entrada" ? findProduct.supplier?.name : newMovement.client

            }
        })

    } catch (error) {
        return res.status(400).json({ 
            success: false, 
            error: error.message 
        });
    }
};

export const getMovementById = async (req, res) => {
    try {
        const {id} = req.params

        const findMovement = await Movement.findById(id).populate("employee", "name")
        .populate("client", "nameClient")
        .populate({ path: "product",select: "nameProduct category supplier",populate: [{path: "category",select: "nameCategory"},{path: "supplier",select: "name"}] })

        return res.status(200).json({
            msg: "Movimiento Encontrado",
            movimientos: findMovement
        })

    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

export const getMovements = async (req, res) => {
    const query = {status: true}
    try {

        const findMovements = await Movement.find(query).populate("employee", "name")
        .populate("client", "nameClient")
        .populate({ path: "product",select: "nameProduct category supplier",populate: [{path: "category",select: "nameCategory"},{path: "supplier",select: "name"}] })

        const total = await Movement.countDocuments(query)

        return res.status(200).json({
            success: true,
            total,
            findMovements
        })

    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};



export const deleteMovement = async (req, res) => {
    try {
        const {id} = req.params

        await Movement.findByIdAndUpdate(id, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            msg: "Movimiento eliminado correctamente",
        })

    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

export const updateMovement = async (req, res) => {
    try {

        const {id} = req.params
        const {entryDate, exitDate, quantity, employee, reason, destiny, product, client} = req.body

        const movementFounded = await Movement.findById(id)

        const findClient = await Client.findOne({nameClient: client})
        const findProduct = await Product.findOne({nameProduct: product})
        const findEmployee = await User.findOne({name: employee})


        if(movementFounded.type === "Entrada"){
            const updateMovement = await Movement.findByIdAndUpdate(id, {
                product: findProduct,
                quantity: quantity,
                employee: findEmployee,
                entryDate: entryDate, 
                reason: reason
            }, {new: true})

            await Product.findOneAndUpdate({nameProduct: product}, {stock: findProduct.stock + quantity}, {new: true})

            return res.status(200).json({
                msg: "Movimiento actualizado con exito!",
                movement:{
                    id: updateMovement._id,
                    product: updateMovement.product,
                    quantity: updateMovement.quantity,
                    employee: updateMovement.employee, 
                    date: updateMovement.entryDate,
                    reason: updateMovement.reason
                }
            })
        }else if(movementFounded.type === "Salida"){
            const updateMovement = await Movement.findByIdAndUpdate(id, {
                product: findProduct,
                quantity: quantity,
                employee: findEmployee,
                exitDate: exitDate, 
                reason: reason,
                destiny: destiny,
                client: findClient
            }, {new: true})

            await Product.findOneAndUpdate({nameProduct: product}, {stock: findProduct.stock - quantity}, {new: true})

            return res.status(200).json({
                msg: "Movimiento actualizado con exito!",
                movement:{
                    id: updateMovement._id,
                    product: updateMovement.product,
                    quantity: updateMovement.quantity,
                    employee: updateMovement.employee,
                    exitDate: updateMovement.exitDate, 
                    reason: updateMovement.reason,
                    destiny: updateMovement.destiny,
                    client: updateMovement.client
                }
            })
        }

    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};