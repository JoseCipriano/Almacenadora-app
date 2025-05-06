import { body, param } from "express-validator";
import { validarCampos } from "./validar-campos.js"
import { esAdminRole } from "./validateRole.js"
import { validarJWT } from "./validar-jwt.js"
import { existEmailClient, existPhoneClient, noExisteClienteById } from "../helpers/db-validator.js";


export const validatorRegisterClient = [
    validarJWT,
    esAdminRole("EMPLEADO"),
    body("nameClient", "The client's name is required").notEmpty(),
    body("phone", "The client number is required").notEmpty(),
    body("phone").custom(existPhoneClient),
    body("email", "The client email is required").notEmpty(),
    body("email").custom(existEmailClient),
    validarCampos
]

export const validatorEditDataClient = [
    validarJWT,
    esAdminRole("ADMIN"),
    param("id", "The Id is required").notEmpty(),
    param("id").custom(noExisteClienteById),
    body("nameClient", "The client's name is required").notEmpty(),
    body("phone", "The client number is required").notEmpty(),
    body("phone").custom(existPhoneClient),
    body("email", "The client email is required").notEmpty(),
    body("email").custom(existEmailClient),
    validarCampos
]

export const validatorDeleteClient = [
    validarJWT,
    esAdminRole("ADMIN"),
    param("id", "The Id is required").notEmpty(),
    param("id").custom(noExisteClienteById),
    validarCampos
]