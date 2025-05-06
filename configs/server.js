
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { hash } from "argon2";
import { dbConnection } from "./mongo.js";

import User from "../src/users/user.model.js";
import Supplier from "../src/suppliers/suppliers.model.js";
import Category from "../src/categories/category.model.js";

import supplierRoutes from "../src/suppliers/suppliers.routes.js"
import movementRoutes from "../src/movements/movement.routes.js";
import limiter from '../src/middlewares/validar-cant-peticiones.js';
import productRoutes from '../src/products/product.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import categoryRoutes from '../src/categories/category.routes.js';
import clientsRoutes from '../src/clients/client.routes.js';
import userRoutes from '../src/users/user.routes.js';

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(limiter)
};


const routes = (app) => {
    app.use("/Almacenadora_app/v1/products", productRoutes);
    app.use("/Almacenadora_app/v1/auth", authRoutes);
    app.use("/Almacenadora_app/v1/categories", categoryRoutes);
    app.use("/Almacenadora_app/v1/supplier", supplierRoutes)
    app.use("/Almacenadora_app/v1/clients", clientsRoutes)
    app.use("/Almacenadora_app/v1/movements",  movementRoutes)
    app.use("/Almacenadora_app/v1/user", userRoutes)
}


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


export const defaultAdmin = async() =>{
    try {
        const Adminemail = "admin@gmail.com"
        const password = "admin123"

        const existAdmin = await User.findOne({email: Adminemail})

        if(!existAdmin){
            const passwordEncrypt = await hash(password)

            const adminUser = new User({
                name: "Admin",
                username: "administrador",
                email: Adminemail,
                password: passwordEncrypt,
                phone: "1234-5678",
                role: "ADMIN"
            })
            await adminUser.save()
            console.log("ADMINISTRADOR CREADO CON EXITO!!!")
        }
        if(existAdmin){
            console.log("Ya se ha generado el Administrador")
        }

    } catch (er) {
        console.error("Error al crear el Administrador ", er)
    }
}

export const defaultCategory = async() =>{
    try {

        const nameDefaultCategory = "Uncategorized"
        
        const existCategory = await Category.findOne({nameCategory: nameDefaultCategory})

        if(!existCategory){
            const defaultCat = new Category({
                nameCategory: "Uncategorized",
                description: "Sin categoria definida, hecha para productos sin categoria"
            })
            await defaultCat.save()
            console.log("CATEGORIA POR DEFECTO CREADA CON EXITO!!!")
        }else if(existCategory){
            console.log("Ya se ha generado la categoria por defecto")
        }

    } catch (err) {
        console.error("Error al crear la categoria por defecto", err)
    }
}

export const defaultSupplier = async() =>{
    try {
        const nameDefault = "Without Supplier"
        const defaultContact = "-----------"
        const existDefault = await Supplier.findOne({name: nameDefault})

        if(!existDefault){
            const defaultCateg = new Supplier({
                name: nameDefault,
                contact: defaultContact
            })
            await defaultCateg.save()
            console.log("PROVEEDOR POR DEFECTO CREADO CON EXITO!!!")
        }else if(existDefault){
            console.log("El proveedor por defecto ya fue creado")
        }

    } catch (err) {
        console.error("Error al crear el distribuidor por defecto", err)
    }
}