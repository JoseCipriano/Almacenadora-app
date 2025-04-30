'use strict';

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import limiter from '../src/middlewares/validar-cant-peticiones.js';
import productRoutes from '../src/products/product.routes.js';
import authRoutes from '../src/auth/auth.routes.js';

const middlewares = (app) =>{
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(express.json())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(limiter)
}

const routes = (app) => {
    app.use("/Almacenadora_app/v1/products", productRoutes);
    app.use("/Almacenadora_app/v1/auth", authRoutes);
}

const conectDB = async() =>{
    try {
        await dbConnection()
        console.log("CONEXIÓN EXITOSA A LA BASE DE DATOS")
    } catch (err) {
        console.log("error al intentar conectar con la base da datos")
        process.exit(1)
    }
}

export const initServer = async() =>{
    const app  = express()
    const Port = process.env.PORT || 3000
    try {
        middlewares(app)
        conectDB()
        routes(app)
        app.listen(Port)
        console.log(`Server init in port ${Port}`)
    } catch (err) {
        console.log(`Server falied init ${Port}`)
    }
}