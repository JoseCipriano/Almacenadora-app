import { Schema, model  } from "mongoose";

const ClientSchema = Schema({
    nameClient:{
        type: String, 
        unique: [true, "El cliente ya existe"], 
        requires:[true, "El nombre del cliente es requerido"], 
    }, 
    phone: {
        type: String, 
        minLenght: 8, 
        maxLenght: 8, 
        requires: true, 
    },
    email: {
        type: String, 
        default: true,
    }, 
    estado: {
        type: Boolean, 
        default: true, 
    }
}, 
{
    timestamps: true, 
    versionKey: false, 
}); 

export default model('Client', ClientSchema);