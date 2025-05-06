import { body, param } from "express-validator";
import { validarCampos } from "./validar-campos.js";
import { existeProductoById, existProductName, noExistenteCategory, noExistenteSupplier } from "../helpers/db-validator.js";
import { validarJWT } from "./validar-jwt.js";
import { esAdminRole } from "./validateRole.js";

export const validatorCreateProduct = [
    validarJWT,
    esAdminRole("ADMIN", "EMPLEADO"),
    body("nameProduct", "The nameProduct is required").notEmpty(),
    body("nameProduct").custom(existProductName),
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
    body("nameProduct").custom(existProductName),
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