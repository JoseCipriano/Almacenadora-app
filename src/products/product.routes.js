import { Router } from "express";
import { createProduct, updateProduct, deleteProduct, getProductsByName, getProductsByCategory, getProductsByDate } from "./product.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { esAdminRole } from "../middlewares/validateRole.js";
import { validatorCreateProduct, validatorUpdateProduct, validatorDeleteProduct } from "../middlewares/validator-Products.js";

const router = Router();

router.get(
    "/Name", 
    validarJWT,
    esAdminRole("ADMIN"),
    getProductsByName
)

router.get(
    "/Category",
    validarJWT,
    esAdminRole("ADMIN"),
    getProductsByCategory
)

router.get(
    "/Date", 
    validarJWT,
    esAdminRole("ADMIN"),
    getProductsByDate
)

router.post(
    "/newProduct",
    validatorCreateProduct,
    createProduct
)

router.put(
    "/:id",
    validatorUpdateProduct,
    updateProduct
)

router.delete(
    "/:id",
    validatorDeleteProduct,
    deleteProduct
)

export default router;