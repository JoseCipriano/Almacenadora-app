import {Schema, model} from "mongoose";

const movementSchema = new Schema({
  type:{
    type: String,
    enum: ["Entrada", "Salida"],
    required: true
  },
  entryDate:{
    type: Date,
    required: function() { return this.type === 'Entrada'; },
    default: Date.now
  },
  exitDate:{
    type: Date,
    required: function() { return this.type === 'salida'; }
  },
  quantity:{
    type: Number,
    required: true,
    min: 1
  },
  employee:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  reason:{
    type: String,
    required: true,
    maxLength: 70 
  },
  destiny:{
    type: String,
    required: function() { return this.type === 'Salida'; },
    minLength: 10,
    maxLength: 30
  },
  product:{
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  client:{
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: function() { return this.type === 'Salida'; }
  },
  status:{
    type: Boolean,
    default: true
  }
},
  {
    timeStamps: true,
    versionKey: false
  }
);

export default model("Movimiento", movementSchema);