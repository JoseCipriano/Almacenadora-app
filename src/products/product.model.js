import { Schema, model } from "mongoose";

const ProductSchema = Schema({
    nameProduct: {
        type: String,
        unique: [true, "El producto ya existe"],
        required: [true, "El nombre del producto es requerido"],
        maxLenght: [100, "El maximo permitido son 100 caracteres"]
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    supplier: {
        type: String,
        required: [true, "El nombre del proveedor es requerido"],
        maxLenght: [100, "El maximo permitido son 100 caracteres"]
    },
    stock: {
        type: Number,
        default: 0,
        min: [0, "El stock no puede ser negativo"]
    },
    dateEntry: {
        type: Date,
        required: [true, "La fecha de entrada del producto es requerido"]
    },
    estado: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true,
    versionKey: false
});

export default model('Product', ProductSchema)