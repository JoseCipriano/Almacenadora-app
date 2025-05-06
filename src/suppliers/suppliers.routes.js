import { Router } from 'express'
import { createSupplier, getSuppliers, getSupplierById, updateSupplier, deleteSupplier } from './suppliers.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validatorCreateSupplier, validatorUpdateSupplier, validatorDeleteSupplier } from '../middlewares/validator-Suppliers.js';
import { esAdminRole } from '../middlewares/validateRole.js';

const router = Router();

router.post(
    '/newSupplier',
    validatorCreateSupplier,
     createSupplier
)

router.get(
    '/', 
    validarJWT,
    esAdminRole,
    getSuppliers
)

router.get(
    '/findSupplier/:id', 
    validarJWT,
    esAdminRole,
    getSupplierById
)

router.put(
    '/updateSupplier/:id',
    validatorUpdateSupplier,
    updateSupplier
)

router.delete(
    '/deleteSupplier/:id',
    validatorDeleteSupplier, 
    deleteSupplier
)

export default router;