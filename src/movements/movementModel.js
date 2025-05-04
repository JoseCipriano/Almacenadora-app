import mongoose from "mongoose";

const movementSchema = new mongoose.Schema({
  producto: {
    type: String,  
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  empleadoEncargado: {
    type: String,
    required: true
  },
  fechaEntrada: {
    type: Date,
    required: true
  },
  fechaSalida: {
    type: Date,
    required: true
  },
  estado: {
    type: String,
    enum: ["Entrada", "Salida"],
    required: true
  }
});

export default mongoose.model("Movimiento", movementSchema);
