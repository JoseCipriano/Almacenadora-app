import { Schema, model } from "mongoose";

const ProductSchema =  new Schema({
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
        type: Schema.Types.ObjectId,
        ref: "Supplier",
        required: true
    },
    stock: {
        type: Number,
        default: 0,
        min: [0, "El stock no puede ser negativo"]
    },
    status: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true,
    versionKey: false
});

export default model('Product', ProductSchema)