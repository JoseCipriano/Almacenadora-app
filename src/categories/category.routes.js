import { Router } from "express";
import { check } from "express-validator";
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js";
import { createCategory, updateCategory, deleteCategory, getCategories } from "./category.controller.js";
import { existeCategoriaById } from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT, esAdminRole } from "../middlewares/validar-jwt.js";

const router = Router();

router.get(
    "/",
    [
        validarJWT,
       
    ],
    getCategories
)

router.post(
    "/",
    [
        validarJWT,
        esAdminRole,
        validarCampos,
        deleteFileOnError
    ],
    createCategory
)

router.put(
    "/:id",
    [
        validarJWT,
        esAdminRole,
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existeCategoriaById),
        validarCampos,
        deleteFileOnError
    ],
    updateCategory
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
    deleteCategory
)

export default router;