import { body, param } from "express-validator";
import { validarCampos } from "./validar-campos";
import { existeProveedorById } from "../helpers/db-validator";
import { validarJWT } from "./validar-jwt";
import { esAdminRole } from "./validateRole";

export const validatorCreateSupplier = [
    validarJWT,
    esAdminRole("ADMIN"),
    body("name", "The name is required").notEmpty(),
    body("contact", "The contact is required").notEmpty(),
    validarCampos
]

export const validatorUpdateSupplier = [
    validarJWT,
    esAdminRole("ADMIN"),
    param("id", "Enter a valid ID").notEmpty(),
    param("id").custom(existeProveedorById),
    body("name", "The name is required").notEmpty(),
    body("contact", "The contact is required").notEmpty(),
    validarCampos
]

export const validatorDeleteSupplier = [
    validarJWT,
    esAdminRole("ADMIN"),
    param("id", "Enter a valid ID").notEmpty(),
    param("id").custom(existeProveedorById),
    validarCampos
]