import Movement from './movementModel.js';


export const getMovements = async (req, res) => {
    try {
        const movimientos = await Movement.find().populate('producto');
        res.json(movimientos);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const createMovement = async (req, res) => {
    try {
        const newMovement = new Movement(req.body);
        await newMovement.save();
        res.status(201).json(newMovement);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export const getMovementById = async (req, res) => {
    try {
        const movimiento = await Movement.findById(req.params.id).populate('producto');
        if (!movimiento) {
            return res.status(404).json({ success: false, message: 'Movimiento no encontrado' });
        }
        res.json(movimiento);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const deleteMovement = async (req, res) => {
    try {
        const movimiento = await Movement.findByIdAndDelete(req.params.id);
        if (!movimiento) {
            return res.status(404).json({ success: false, message: 'Movimiento no encontrado' });
        }
        res.json({ success: true, message: 'Movimiento eliminado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const updateMovement = async (req, res) => {
    try {
        const { id } = req.params;
        const { producto, cantidad, empleadoEncargado, fechaEntrada, fechaSalida, estado } = req.body;

        // Actualizar el movimiento en la base de datos
        const updatedMovement = await Movement.findByIdAndUpdate(id, {
            producto, cantidad, empleadoEncargado, fechaEntrada, fechaSalida, estado
        }, { new: true });


        if (!updatedMovement) {
            return res.status(404).json({ success: false, message: 'Movimiento no encontrado' });
        }

        return res.status(200).json({ success: true, message: 'Movimiento actualizado exitosamente', movement: updatedMovement });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
