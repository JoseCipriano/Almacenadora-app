
import { Router } from 'express';
import { getMovements, createMovement, getMovementById, deleteMovement, updateMovement } from './movementController.js';

const router = Router();


router.get('/', getMovements); 
router.post('/', createMovement); 
router.get('/:id', getMovementById);  
router.put('/:id', updateMovement);  
router.delete('/:id', deleteMovement);  

export default router;
