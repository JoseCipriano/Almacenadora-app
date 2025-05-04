
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import movementRoutes from "../src/movements/movement.routes.js";  // Importación correcta

import { validateCantidad } from "../src/middlewares/validateCantidad.js";
import { validateEmpleadoEncargado } from "../src/middlewares/validateEmpleadoEncargado.js";
import { validateEstado } from "../src/middlewares/validateEstado.js";
import { validateFechas } from "../src/middlewares/validateFechas.js";
import { validateProducto } from "../src/middlewares/validateProducto.js";

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan("dev"));
};


const routes = (app) => {
    
    app.use("/api/movements", 
        validateCantidad, 
        validateEmpleadoEncargado, 
        validateEstado, 
        validateFechas, 
        validateProducto, 
        movementRoutes
    );
    app.use("/Almacenadora_app/v1/movements", movementRoutes)
};


const conectDB = async () => {
    try {
        await dbConnection();
        console.log("CONEXIÓN EXITOSA A LA BASE DE DATOS");
    } catch (err) {
        console.log("Error al intentar conectar con la base de datos");
        process.exit(1);
    }
};

export const initServer = async () => {

    const app = express();
    const Port = process.env.PORT || 3000;

    try{
        middlewares(app)
        conectDB()
        routes(app)
        app.listen(Port)
        console.log(`Server init in port ${Port}`)
    } catch (err) {
        console.log(`Server falied init ${err}`)
    }
};
