import { body, param } from "express-validator";
import { validarCampos } from "./validar-campos.js";
import { existContactSupplier, existenteSupplier, existeProveedorById } from "../helpers/db-validator.js";
import { validarJWT } from "./validar-jwt.js";
import { esAdminRole } from "./validateRole.js";

export const validatorCreateSupplier = [
    validarJWT,
    esAdminRole("ADMIN", "EMPLEADO"),
    body("name", "The name is required").notEmpty(),
    body("name").custom(existenteSupplier),
    body("contact", "The contact is required").notEmpty(),
    body("contact", "Enter a valid email").isEmail(),
    body("contact").custom(existContactSupplier),
    validarCampos
]

export const validatorUpdateSupplier = [
    validarJWT,
    esAdminRole("ADMIN"),
    param("id", "Enter a valid ID").notEmpty(),
    param("id").custom(existeProveedorById),
    body("name", "The name is required").notEmpty(),
    body("name").custom(existenteSupplier),
    body("contact", "The contact is required").notEmpty(),
    body("contact", "Enter a valid email").isEmail(),
    body("contact").custom(existContactSupplier),
    validarCampos
]

export const validatorDeleteSupplier = [
    validarJWT,
    esAdminRole("ADMIN"),
    param("id", "Enter a valid ID").notEmpty(),
    param("id").custom(existeProveedorById),
    validarCampos
]