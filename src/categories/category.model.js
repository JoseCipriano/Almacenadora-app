import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
    nameCategory:{
        type: String,
        unique: [true, "La categoria ya existe"],
        required: [true, "El nombre de la categoria es requerido"],
        maxLength: [25, "El maximo permitido son 25 caracteres"]
    },
    description:{
        type: String,
        required: [true, "La descripcion es requerida"],
        maxLength: [500, "El maximo permitido son 500 caracteres"]
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    timestamps: true,
    versionKey: false
});

export default model('Category', CategorySchema)