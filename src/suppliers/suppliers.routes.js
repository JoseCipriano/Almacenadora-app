import { Router } from 'express'
import { createSupplier, getSuppliers, getSupplierById, updateSupplier, deleteSupplier } from './suppliers.controller.js';

const router = Router();

router.post('/newSupplier', createSupplier);

router.get('/', getSuppliers);

router.get('/findSupplier/:id', getSupplierById);

router.put('/updateSupplier/:id', updateSupplier);

router.delete('/deleteSupplier/:id', deleteSupplier);

export default router;
