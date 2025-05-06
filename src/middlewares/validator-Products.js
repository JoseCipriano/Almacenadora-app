import { body, param } from "express-validator";
import { validarCampos } from "./validar-campos";
import { existeProductoById, noExistenteCategory, noExistenteSupplier } from "../helpers/db-validator";
import { validarJWT } from "./validar-jwt";
import { esAdminRole } from "./validateRole";

export const validatorCreateProduct = [
    validarJWT,
    esAdminRole("ADMIN"),
    body("nameProduct", "The nameProduct is required").notEmpty(),
    body("category", "Enter a category for the product").notEmpty(),
    body("category").custom(noExistenteCategory),
    body("supplier", "Enter a supplier for the product").notEmpty(),
    body("supplier").custom(noExistenteSupplier),
    body("stock", "Enter a quantity of existing products").notEmpty().isFloat({gt: 0}).withMessage("The stock must be greater than zero"),
    validarCampos
]

export const validatorUpdateProduct = [
    validarJWT,
    esAdminRole("ADMIN"),
    param("id", "Enter a valid ID").notEmpty(),
    param("id").custom(existeProductoById),
    body("nameProduct", "The nameProduct is required").notEmpty(),
    body("category", "Enter a category for the product").notEmpty(),
    body("category").custom(noExistenteCategory),
    body("supplier", "Enter a supplier for the product").notEmpty(),
    body("supplier").custom(noExistenteSupplier),
    body("stock", "Enter a quantity of existing products").notEmpty().isFloat({gt: 0}).withMessage("The stock must be greater than zero"),
    validarCampos
]

export const validatorDeleteProduct = [
    validarJWT,
    esAdminRole("ADMIN"),
    param("id", "Enter a valid ID").notEmpty(),
    param("id").custom(existeProductoById),
    validarCampos
]