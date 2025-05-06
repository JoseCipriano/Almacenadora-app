import { body, param } from "express-validator";
import { validarCampos } from "./validar-campos.js";
import { existeCategoriaById } from "../helpers/db-validator.js";
import { validarJWT } from "./validar-jwt.js";
import { esAdminRole } from "./validateRole.js";

export const validatorCreateCategory = [
    validarJWT,
    esAdminRole("ADMIN"),
    body("nameCategory", "The nameCategory is required").notEmpty(),
    body("description", "The description is required").notEmpty(),
    validarCampos
]

export const validatorUpdateCategory = [
    validarJWT,
    esAdminRole("ADMIN"),
    param("id", "Enter a valid ID").notEmpty(),
    param("id").custom(existeCategoriaById),
    body("nameCategory", "The nameCategory is required").notEmpty(),
    body("description", "The description is required").notEmpty(),
    validarCampos
]

export const validatorDeleteCategory = [
    validarJWT,
    esAdminRole("ADMIN"),
    param("id", "Enter a valid ID").notEmpty(),
    param("id").custom(existeCategoriaById),
    validarCampos
]