
import { Router } from 'express';
import { getMovements, createMovement, getMovementById, deleteMovement, updateMovement } from './movementController.js';

const router = Router();

router.get(
    '/callMovements', 
    getMovements
); 

router.post(
    '/newMovement', 
    createMovement
); 

router.get(
    '/movementId/:id', 
    getMovementById
);  

router.put(
    '/updateMovement/:id', 
    updateMovement
);  

router.delete(
    '/deleteMovement/:id', 
    deleteMovement
);  

export default router;
/*
        validateCantidad, 
        validateEmpleadoEncargado, 
        validateEstado, 
        validateFechas, 
        validateProducto,
*/