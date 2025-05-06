import { Router } from "express";
import { createCategory, updateCategory, deleteCategory, getCategories } from "./category.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validatorCreateCategory, validatorUpdateCategory, validatorDeleteCategory } from "../middlewares/validator-Categories.js";
import { esAdminRole } from "../middlewares/validateRole.js";

const router = Router();

router.get(
    "/",
    validarJWT,
    esAdminRole,
    getCategories
)

router.post(
    "/addCategory",
    validatorCreateCategory,
    createCategory
)

router.put(
    "/:id",
    validatorUpdateCategory,
    updateCategory
)

router.delete(
    "/:id",
    validatorDeleteCategory,
    deleteCategory
)

export default router;