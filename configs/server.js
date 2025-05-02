import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import supplierRoutes from "../src/suppliers/suppliers.routes.js"


const middlewares = (app) =>{
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(express.json())
    app.use(helmet())
    app.use(morgan("dev"))
}

const routes = (app) =>{
    app.use("/Almacenadora_app/v1/supplier", supplierRoutes)
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

export const initServer = async () => {
    const app = express()
    try{
        middlewares(app)
        await conectDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}