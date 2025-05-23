import { Router } from "express";
import { check } from "express-validator";
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js";
import { createCategory, updateCategory, deleteCategory, getCategories } from "./category.controller.js";
import { existeCategoriaById } from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { esAdminRole } from "../middlewares/validateRole.js";

const router = Router();

router.get(
    "/",
    [
        validarJWT,
    ],
    getCategories
)

router.post(
    "/addCategory",
    [
        validarJWT,
        esAdminRole("ADMIN"),
        validarCampos
    ],
    createCategory
)

router.put(
    "/:id",
    [
        validarJWT,
        esAdminRole("ADMIN"),
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
        esAdminRole("ADMIN"),
        check("id", "No es un ID válido").isMongoId(),
        validarCampos,
        deleteFileOnError
    ],
    deleteCategory
)

export default router;