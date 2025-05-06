import { Router } from "express";
import { check } from "express-validator";
import { createProduct, updateProduct, deleteProduct, getProductsByName, getProductsByCategory, getProductsByDate } from "./product.controller.js";
import { existeProductoById } from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { esAdminRole } from "../middlewares/validateRole.js";

const router = Router();

router.get(
    "/Name", 
    [
        validarJWT,
        esAdminRole("ADMIN")
    ],
    getProductsByName
)

router.get(
    "/Category",
    [
        validarJWT,
        esAdminRole("ADMIN")
    ],
    getProductsByCategory
)

router.get(
    "/Date", 
    [
        validarJWT,
        esAdminRole("ADMIN")
    ],
    getProductsByDate
)

router.post(
    "/newProduct",
    [
        validarJWT,
        esAdminRole("ADMIN"),
        validarCampos
    ],
    createProduct
)

router.put(
    "/:id",
    [
        validarJWT,
        esAdminRole("ADMIN"),
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existeProductoById),
        validarCampos
    ],
    updateProduct
)

router.delete(
    "/:id",
    [
        validarJWT,
        esAdminRole("ADMIN"),
        check("id", "No es un ID válido").isMongoId(),
        validarCampos
    ],
    deleteProduct
)

export default router;