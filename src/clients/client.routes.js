import { Router } from "express";
import { createClient, updateClient, deleteClient, getClients } from "./client.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validatorDeleteClient, validatorEditDataClient, validatorRegisterClient } from "../middlewares/validator-Clients.js";

const router = Router();

router.get(
    "/",
    validarJWT,
    getClients
)

router.post(
    "/newClient",
    validatorRegisterClient,
    createClient
)

router.put(
    "/updateClient/:id",
    validatorEditDataClient,
    updateClient
)

router.delete(
    "/deleteClient/:id",
    validatorDeleteClient,
    deleteClient
)

export default router;