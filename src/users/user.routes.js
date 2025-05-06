import {Router } from 'express';
import { getUserByName, getUsers, getUserById, updateUser, getProfile, deleteUser } from './user.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { esAdminRole } from '../middlewares/validateRole.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();

//perfil del usuario logueado
router.get("/profile", 
    [
         validarJWT,
         esAdminRole("ADMIN")
    ],
    getProfile);

    //obtener todos los usuarios
router.get("/", 
    [ 
        validarJWT,
        esAdminRole("ADMIN"),
    ],
    getUsers)

// obtener a los usuarios por id 

router.get("/:uid", 
    [
        validarJWT,
        esAdminRole("ADMIN"),
    ],
    
    getUserById);

//obtener a los usuarios por nombre 
router.get("/findUserByName/:name", 
    [
        validarJWT,
        esAdminRole("ADMIN"),
    ],
     getUserByName)




router.put("/updateUser/:id", 
    [
        validarJWT,
        esAdminRole("ADMIN"),
        validarCampos
    ],
    
    updateUser)

router.delete("/deleteUser/:uid",
    [
        validarJWT
    ],
    deleteUser
)

export default router;