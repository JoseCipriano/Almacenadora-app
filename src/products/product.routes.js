import { Router } from "express";
import { check } from "express-validator";
import { deleteFileOnError } from '../middlewares/delete-file-on-error.js';
import { createProduct, updateProduct, deleteProduct, getProductsByName, getProductsByCategory, getProductsByDate } from "./product.controller.js";
import { existeProductoById } from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT, esAdminRole } from "../middlewares/validar-jwt.js";

const router = Router();

router.get(
    "/Name", 
    [
        validarJWT,
        esAdminRole
    ],
    getProductsByName
)

router.get(
    "/Category",
    [
        validarJWT,
        esAdminRole
    ],
    getProductsByCategory
)

router.get(
    "/Date", 
    [
        validarJWT,
        esAdminRole
    ],
    getProductsByDate
)

router.post(
    "/",
    [
        validarJWT,
        esAdminRole,
        validarCampos,
        deleteFileOnError   
    ],
    createProduct
)

router.put(
    "/:id",
    [
        validarJWT,
        esAdminRole,
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existeProductoById),
        validarCampos,
        deleteFileOnError
    ],
    updateProduct
)

router.delete(
    "/:id",
    [
        validarJWT,
        esAdminRole,
        check("id", "No es un ID válido").isMongoId(),
        validarCampos,
        deleteFileOnError
    ],
    deleteProduct
)

export default router;