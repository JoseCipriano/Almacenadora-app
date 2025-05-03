import { Router } from "express";
import { check } from "express-validator";
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js";
import { createClient, updateClient, deleteClient, getClients } from "./client.controller.js";
import { existeClienteById } from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT, esAdminRole } from "../middlewares/validar-jwt.js";

const router = Router();

router.get(
    "/",
    [
        validarJWT,
    ],
    getClients
)

router.post(
    "/",
    [
        validarJWT,
        esAdminRole,
        validarCampos,
        deleteFileOnError
    ],
    createClient
)

router.put(
    "/:id",
    [
        validarJWT,
        esAdminRole,
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existeClienteById),
        validarCampos,
        deleteFileOnError
    ],
    updateClient
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

    deleteClient
)

export default router;

