import { Schema, model  } from "mongoose";

const ClientSchema = new Schema({
    nameClient:{
        type: String, 
        unique: [true, "El cliente ya existe"], 
        required:[true, "El nombre del cliente es requerido"], 
    }, 
    phone: {
        type: String, 
        minLenght: 8, 
        maxLenght: 16, 
        required: true, 
    },
    email: {
        type: String, 
        default: true,
    }, 
    estado: {
        type: Boolean, 
        default: true, 
    },
    role:{
        type: String,
        default: "CLIENT"
    }
}, 
{
    timestamps: true, 
    versionKey: false, 
}); 

export default model('Client', ClientSchema);